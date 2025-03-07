import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Action } from "./sub/action.schema";

export class Actions {
    
    @Prop({ type: [SchemaFactory.createForClass(Action)], default: [] })
    standard: Action[];
  
    @Prop({ type: [SchemaFactory.createForClass(Action)], default: [] })
    legendary: Action[];
  
    @Prop({ type: [SchemaFactory.createForClass(Action)], default: [] })
    lair: Action[];
  }