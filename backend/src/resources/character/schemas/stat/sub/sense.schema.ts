import { Prop } from "@nestjs/mongoose";

export class Senses {
    @Prop({ required: true })
    darkvision: number;
  
    @Prop({ required: true })
    passivePerception: number;
}