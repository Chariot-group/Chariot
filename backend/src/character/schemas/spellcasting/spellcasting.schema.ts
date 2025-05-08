import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Spell } from '@/character/schemas/spellcasting/sub/spell.schema';

@Schema({ _id: false })
export class Spellcasting {
  @Prop({ required: true })
  ability: string;

  @Prop({ required: true })
  saveDC: number;

  @Prop({ required: true })
  attackBonus: number;
  @Prop({
    type: Map,
    of: new MongooseSchema(
      {
        total: { type: Number, default: 0 },
        used: { type: Number, default: 0 },
      },
      { _id: false },
    ),
  })
  spellSlotsByLevel: Map<number, { total: number; used: number }>;

  @Prop({ default: 0 })
  totalSlots: number;

  @Prop({ type: [Spell], default: [] })
  spells: Spell[];
}

export const SpellcastingSchema = SchemaFactory.createForClass(Spellcasting);
