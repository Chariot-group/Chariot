import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Classification {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  subtype: string;
}

export const ClassificationSchema =
  SchemaFactory.createForClass(Classification);
