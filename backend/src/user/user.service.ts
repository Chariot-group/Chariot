import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { Campaign, CampaignDocument } from '@/campaign/schemas/campaign.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  private readonly SERVICE_NAME = UserService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: {
    page?: number;
    offset?: number;
    sort?: string;
    email?: string;
  }) {
    try {
      const { page = 1, offset = 10, email = '' } = query;
      const skip = (page - 1) * offset;

      const filter = {
        email: { $regex: `${email}`, $options: 'i' },
        deletedAt: { $eq: null },
      };

      const sort: { [key: string]: 1 | -1 } = { updatedAt: 1 };

      if (query.sort) {
        query.sort.startsWith('-')
          ? (sort[query.sort.substring(1)] = -1)
          : (sort[query.sort] = 1);
      }

      const totalItems = await this.userModel.countDocuments(filter);

      const start: number = Date.now();
      const users = await this.userModel
        .find(filter)
        .skip(skip)
        .limit(offset)
        .sort(sort)
        .exec();
      const end: number = Date.now();

      const message = `Users found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: users,
        pagination: {
          page,
          offset,
          totalItems,
        },
      };
    } catch (error) {
      const message = `Error while fetching users: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while fetching campaign ${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const user = await this.userModel.findById(id).exec();
      const end: number = Date.now();

      if (!user) {
        const message = `User ${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (user.deletedAt) {
        const message = `User ${id} is gone`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      const message = `User found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: user,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      const message = `Error while getting user: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  
  async findByEmail(email: string) {
    try {
      const start: number = Date.now();
      const user = await this.userModel.findOne({email: email}).exec();
      const end: number = Date.now();

      if (!user) {
        const message = `User ${email} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        return null;
      }

      if (user.deletedAt) {
        const message = `User ${email} is gone`;
        this.logger.error(message, null, this.SERVICE_NAME);
        return null;
      }

      const message = `User found in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);

      return user;

    } catch (error) {
      const message = `Error while getting user: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      return null;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while updating user #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }
      let user = await this.userModel.findById(id);

      if (!user) {
        const message = `User #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (user.deletedAt) {
        const message = `User #${id} deleted`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      const { campaigns } = updateUserDto;

      const campaignsCheckPromises = campaigns.map((campaignId) =>
        this.campaignModel.findById(campaignId).exec(),
      );
      const campaignsCheckResults = await Promise.all(campaignsCheckPromises);
      // If one or more campaigns are not found, log and throw an error
      const invalidCampaigns = campaignsCheckResults.filter(
        (campaign) => !campaign,
      );
      if (invalidCampaigns.length > 0) {
        const invalidCampainIds = campaigns.filter(
          (_, index) => !campaignsCheckResults[index],
        );
        const message = `Invalid campaigns IDs: ${invalidCampainIds.join(', ')}`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();
      const userUpdate = await this.userModel
        .updateOne({ _id: id }, updateUserDto)
        .exec();
      user = await this.userModel.findById(id).populate('campaigns').exec();
      const end: number = Date.now();

      if (!user || userUpdate.modifiedCount === 0) {
        const message = `User #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      const message = `User update in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: user,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof GoneException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      const message = `Error while updating user: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        const message = `Error while deleting user #${id}: Id is not a valid mongoose id`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new BadRequestException(message);
      }

      const start: number = Date.now();

      const user = await this.userModel.findById(id).exec();

      if (!user) {
        const message = `User #${id} not found`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new NotFoundException(message);
      }

      if (user.deletedAt) {
        const message = `User #${id} already deleted`;
        this.logger.error(message, null, this.SERVICE_NAME);
        throw new GoneException(message);
      }

      user.deletedAt = new Date();
      await user.save();

      const end: number = Date.now();

      const message = `User delete in ${end - start}ms`;
      this.logger.verbose(message, this.SERVICE_NAME);
      return {
        message,
        data: user,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof GoneException
      ) {
        throw error;
      }

      const message = `Error while deleting character ${id}: ${error.message}`;
      this.logger.error(message, null, this.SERVICE_NAME);
      throw new InternalServerErrorException(message);
    }
  }
}
