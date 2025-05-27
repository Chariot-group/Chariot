import { DamageDto } from '@/resources/character/npc/dto/actions/sub/damage.dto';
export declare class ActionDto {
    name?: string;
    type?: string;
    attackBonus?: string;
    damage?: DamageDto;
    range?: string;
}
