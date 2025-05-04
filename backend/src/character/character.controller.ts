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
import { CharacterService } from '@/character/character.service';
import { CreateCharacterDto } from '@/character/dto/create-character.dto';
import { UpdateCharacterDto } from '@/character/dto/update-character.dto';
import { ParseNullableIntPipe } from '@/pipes/parse-nullable-int.pipe';
import { IsCreator } from '@/common/decorators/is-creator.decorator';
import { IsCreatorGuard } from '@/common/guards/is-creator.guard';
@UseGuards(IsCreatorGuard)
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  createCharacter(
    @Req() request,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    const userId = request.user.userId;

    return this.characterService.create(createCharacterDto, userId);
  }

  @Get()
  findAll(
    @Req() request,
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('name') name?: string,
    @Query('sort') sort?: string,
  ) {
    const userId = request.user.userId;
    return this.characterService.findAllByUser(userId, {
      page,
      offset,
      name,
      sort,
    });
  }

  @IsCreator(CharacterService)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @IsCreator(CharacterService)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @IsCreator(CharacterService)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
