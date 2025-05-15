import { PartialType } from '@nestjs/mapped-types';
import { CreateNpcDto } from '@/character/npc/dto/create-npc.dto';

export class UpdateNpcDto extends PartialType(CreateNpcDto) {}
