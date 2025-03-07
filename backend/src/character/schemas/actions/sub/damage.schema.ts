import { Prop } from "@nestjs/mongoose";

export class Damage {
    @Prop({ required: true })
    dice: string;
  
    @Prop({ required: true })
    type: string;
}