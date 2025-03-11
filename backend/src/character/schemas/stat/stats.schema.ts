import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Speed } from "./sub/speed.schema";
import { AbilityScores } from "./sub/abilityScores.schema";
import { SavingThrows } from "./sub/savingThrows.schema";
import { Skills } from "./sub/skill.schema";
import { Senses } from "./sub/sense.schema";

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
  
    @Prop({ type: SchemaFactory.createForClass(Speed), required: true })
    speed: Speed;
  
    @Prop({ type: SchemaFactory.createForClass(AbilityScores), required: true })
    abilityScores: AbilityScores;
  
    @Prop({ type: SchemaFactory.createForClass(SavingThrows) })
    savingThrows?: SavingThrows;
  
    @Prop({ type: SchemaFactory.createForClass(Skills) })
    skills?: Skills;
  
    @Prop({ type: SchemaFactory.createForClass(Senses), required: true })
    senses: Senses;
}