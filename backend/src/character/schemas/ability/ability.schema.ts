import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Ability {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
