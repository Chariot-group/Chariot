import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from '@/resources/character/player/dto/create-player.dto';
import { UpdatePlayerDto } from '@/resources/character/player/dto/update-player.dto';
import { Model, Types } from 'mongoose';
import { Group, GroupDocument } from '@/resources/group/schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from '@/resources/character/core/schemas/character.schema';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<Character>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  private readonly SERVICE_NAME = PlayerService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  private async validateGroupRelations(groupIds: string[]): Promise<void> {
    if (!groupIds || groupIds.length === 0) return;

    for (const groupId of groupIds) {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new BadRequestException(`Invalid group ID: #${groupId}`);
      }

      const group = await this.groupModel.findById(groupId).exec();
      if (!group) {
        throw new NotFoundException(`Group not found: #${groupId}`);
      }

      if (group.deletedAt) {
        throw new GoneException(`Group already deleted: #${groupId}`);
      }
    }
  }

  private async validateResource(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      const message = `Error while fetching character #${id}: Id is not a valid mongoose id`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new BadRequestException(message);
    }
    const player = await this.characterModel.findById(id).exec();

    if (!player) {
      const message = `Player #${id} not found`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new NotFoundException(message);
    }

    if (player.deletedAt) {
      const message = `Player #${id} is gone`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new GoneException(message);
    }
  }

  async create(createPlayerDto: CreatePlayerDto, userId: string) {
    try {
      if (createPlayerDto.groups) {
        for (const groupId of createPlayerDto.groups) {
          if (!Types.ObjectId.isValid(groupId)) {
            throw new BadRequestException(
              `Invalid group ID format: #${groupId}`,
            );
          }
        }
        await this.validateGroupRelations(createPlayerDto.groups);
      }

      const start = Date.now();
      const newPlayer = new this.characterModel.discriminators['player']({
        ...createPlayerDto,
        createdBy: new Types.ObjectId(userId),
      });
      const savedPlayer = await newPlayer.save();
      await this.groupModel.updateMany(
        {
          _id: {
            $in:
              createPlayerDto.groups && createPlayerDto.groups.map((id) => id),
          },
        },
        { $addToSet: { characters: savedPlayer._id } },
      );
      const end = Date.now();

      const message = `Player created in ${end - start}ms`;
      return {
        message,
        data: savedPlayer,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof GoneException
      ) {
        throw error;
      }
      let message = `Error creating Player: ${error.message}`;
      this.logger.error(message);
      throw new InternalServerErrorException(message);
    }
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    try {
      let { groups, ...playerData } = updatePlayerDto;
      await this.validateResource(id);

      let player = await this.characterModel.findById(id).exec();

      //Vérification ids characters
      if (groups) {
        const groupCheckPromises = groups.map((groupId) =>
          this.groupModel.findById(groupId).exec(),
        );
        const groupCheckResults = await Promise.all(groupCheckPromises);
        const invalidGroups = groupCheckResults.filter((group) => !group);
        if (invalidGroups.length > 0) {
          const invalidPlayerIds = groups.filter(
            (_, index) => !groupCheckResults[index],
          );
          const message = `Invalid group IDs: ${invalidPlayerIds.join(', ')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new BadRequestException(message);
        }

        const goneGroups = groupCheckResults.filter((group) => group.deletedAt);
        if (goneGroups.length > 0) {
          const goneGroupIds = goneGroups.map((group) => group._id.toString());
          const message = `Gone group IDs: #${goneGroupIds.join(', #')}`;
          this.logger.error(message, null, this.SERVICE_NAME);
          throw new GoneException(message);
        }
      } else {
        groups = player.groups.map((group) => group._id.toString());
      }

      const groupsToRemove = player.groups.filter(
        (oldGroups) =>
          !groups.some((newGroups) => newGroups === oldGroups._id.toString()),
      );

      const start: number = Date.now();
      const playerUpdate = await this.characterModel.discriminators['player']
        .updateOne(
          { _id: id },
          {
            ...playerData,
            groups,
          },
        )
        .exec();
      player = await this.characterModel.findById(id).populate('groups').exec();

      await this.groupModel.updateMany(
        { _id: { $in: groups.map((id) => id) } },
        { $addToSet: { characters: id } },
      );
      await this.groupModel.updateMany(
        { _id: { $in: groupsToRemove } },
        { $pull: { characters: id } },
      );

      const end: number = Date.now();

      if (playerUpdate.modifiedCount === 0) {
        const message = `Player #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      const message = `Player #${id} update in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: player,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      const message = `Error while updating #${id} Player: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
