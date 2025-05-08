import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Speed {
  @Prop({ required: false })
  walk?: number;

  @Prop({ required: false })
  climb?: number;

  @Prop({ required: false })
  swim?: number;

  @Prop({ required: false })
  fly?: number;

  @Prop({ required: false })
  burrow?: number;
}
export const SpeedSchema = SchemaFactory.createForClass(Speed);
