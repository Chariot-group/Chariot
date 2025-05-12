import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from '@/character/dto/create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
