import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Sense {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  value: number;
}

export const SenseSchema = SchemaFactory.createForClass(Sense);
