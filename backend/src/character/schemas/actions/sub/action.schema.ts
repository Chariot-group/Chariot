import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Damage } from "./damage.schema";
import { Actions } from "../actions.schema";

export class Action {
    
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    type: string;
  
    @Prop({ required: true })
    attackBonus: number;
  
    @Prop({ type: Damage, required: true })
    damage: Damage;
  
    @Prop({ required: true })
    range: string;
}