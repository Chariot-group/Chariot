import { Prop } from "@nestjs/mongoose";

export class AbilityScores {
    @Prop({ required: true })
    strength: number;
  
    @Prop({ required: true })
    dexterity: number;
  
    @Prop({ required: true })
    constitution: number;
  
    @Prop({ required: true })
    intelligence: number;
  
    @Prop({ required: true })
    wisdom: number;
  
    @Prop({ required: true })
    charisma: number;
}