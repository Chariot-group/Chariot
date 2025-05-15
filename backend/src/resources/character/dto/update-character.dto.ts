import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from '@/resources/character/dto/create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
