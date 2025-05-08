import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Treasure {
  @Prop({ default: 0 })
  cp: number;

  @Prop({ default: 0 })
  sp: number;

  @Prop({ default: 0 })
  ep: number;

  @Prop({ default: 0 })
  gp: number;

  @Prop({ default: 0 })
  pp: number;

  @Prop()
  notes: string;
}

export const TreasureSchema = SchemaFactory.createForClass(Treasure);
