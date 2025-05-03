import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from '@/group/group.service';
import { CreateGroupDto } from '@/group/dto/create-group.dto';
import { UpdateGroupDto } from '@/group/dto/update-group.dto';
import { ParseNullableIntPipe } from '@/pipes/parse-nullable-int.pipe';
import { CharacterService } from '@/character/character.service';
import { IsCreatorGuard } from '@/common/guards/is-creator.guard';
import { IsCreator } from '@/common/decorators/is-creator.decorator';

@UseGuards(IsCreatorGuard)
@Controller('groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly characterService: CharacterService,
  ) {}

  @Post()
  create(@Req() request, @Body() createGroupDto: CreateGroupDto) {
    const userId = request.user.userId;

    return this.groupService.create(createGroupDto, userId);
  }

  @Get()
  findAll(
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('label') label?: string,
    @Query('sort') sort?: string,
  ) {
    return this.groupService.findAll({ page, offset, label, sort });
  }

  @IsCreator(GroupService)
  @Get(':id/characters')
  findAllCharacters(
    @Param('id') id: string,
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('name') name?: string,
    @Query('sort') sort?: string,
  ) {
    return this.characterService.findAll({ page, offset, name, sort }, id);
  }

  @IsCreator(GroupService)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @IsCreator(GroupService)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @IsCreator(GroupService)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
