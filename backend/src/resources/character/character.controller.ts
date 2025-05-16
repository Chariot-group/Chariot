import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from '@/resources/character/character.service';
import { IsCreator } from '@/common/decorators/is-creator.decorator';
import { IsCreatorGuard } from '@/common/guards/is-creator.guard';
import { ParseNullableIntPipe } from '@/common/pipes/parse-nullable-int.pipe';
@UseGuards(IsCreatorGuard)
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
