import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Spell {
  @Prop()
  name?: string;

  @Prop()
  level?: number;

  @Prop()
  school?: string;

  @Prop()
  description?: string;

  @Prop({ default: [] })
  components: string[];

  @Prop()
  castingTime?: string;

  @Prop()
  duration?: string;

  @Prop()
  range?: string;

  @Prop()
  effectType?: 'attack' | 'heal' | 'utility';

  @Prop()
  damage?: string;

  @Prop()
  healing?: string;
}

export const SpellSchema = SchemaFactory.createForClass(Spell);
