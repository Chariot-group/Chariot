import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Class {
  @Prop({ required: true })
  name: string;

  @Prop()
  subclass: string;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  hitDice: number;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
