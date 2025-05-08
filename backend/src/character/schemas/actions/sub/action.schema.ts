import { Prop } from '@nestjs/mongoose';
import { Damage } from '@/character/schemas/actions/sub/damage.schema';
import { Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Action {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  attackBonus: number;

  @Prop({ type: Damage, required: true })
  damage: Damage;

  @Prop({ required: true })
  range: string;
}
