import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from '@/character/dto/create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
