import { Prop } from "@nestjs/mongoose";
import { Speed } from "./sub/speed.schema";
import { AbilityScores } from "./sub/abilityScores.schema";
import { SavingThrows } from "./sub/savingThrows.schema";
import { Skills } from "./sub/skill.schema";
import { Senses } from "./sub/sense.schema";

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