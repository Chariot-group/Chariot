import { Prop } from "@nestjs/mongoose";

export class Ability {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    description: string;
}