import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ParseNullableIntPipe } from '@/pipes/parse-nullable-int.pipe';
import { CharacterService } from '@/character/character.service';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly characterService: CharacterService
  ) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll(@Query('page', ParseNullableIntPipe) page?: number, @Query('offset',ParseNullableIntPipe) offset?: number, @Query('label') label?: string, @Query('sort') sort?: string,) {
      return this.groupService.findAll({ page, offset, label, sort });
  }

  @Get(':id/characters')
  findAllCharacters(@Param('id') id: string, @Query("page", ParseNullableIntPipe) page?: number, @Query('offset', ParseNullableIntPipe) offset?: number, @Query('name') name?: string, @Query('sort') sort?: string) {
    return this.characterService.findAll({page, offset, name, sort}, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
