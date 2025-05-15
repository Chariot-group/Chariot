import { Prop, Schema } from "@nestjs/mongoose";
import { Speed } from "@/resources/character/schemas/stat/sub/speed.schema";
import { AbilityScores } from "@/resources/character/schemas/stat/sub/abilityScores.schema";
import { SavingThrows } from "@/resources/character/schemas/stat/sub/savingThrows.schema";
import { Skills } from "@/resources/character/schemas/stat/sub/skill.schema";
import { Senses } from "@/resources/character/schemas/stat/sub/sense.schema";

@Schema()
export class Stats {

    @Prop({ required: true })
    maxHitPoints: number;
  
    @Prop({ required: true })
    currentHitPoints: number;
  
    @Prop({ required: true })
    tempHitPoints: number;
  
    @Prop({ required: true })
    hitDice: string;
  
    @Prop({ required: true })
    armorClass: number;
  
    @Prop({ type: Speed, required: true })
    speed: Speed;
  
    @Prop({ type: AbilityScores, required: true })
    abilityScores: AbilityScores;
  
    @Prop({ type: SavingThrows })
    savingThrows?: SavingThrows;
  
    @Prop({ type: Skills })
    skills?: Skills;
  
    @Prop({ type: Senses, required: true })
    senses: Senses;
}