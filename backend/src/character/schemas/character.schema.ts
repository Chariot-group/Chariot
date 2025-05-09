import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Stats } from '@/character/schemas/stat/stats.schema';
import { Affinities } from '@/character/schemas/affinities/affinities.schema';
import { Group } from '@/group/schemas/group.schema';
import { BaseSchema } from '@/common/schemas/base-schema';
import { Ability } from '@/character/schemas/ability/ability.schema';
import { Spellcasting } from '@/character/schemas/spellcasting/spellcasting.schema';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true, discriminatorKey: 'kind' })
export class Character extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Stats, default: {} })
  stats: Stats;

  @Prop({ type: Affinities, default: {} })
  affinities: Affinities;

  @Prop({ type: [Ability], default: [] })
  abilities: Ability[];

  @Prop({ type: [Spellcasting], default: [] })
  spellcasting: Spellcasting[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    default: [],
    required: true,
  })
  groups: Group[];

  @Prop({ default: null })
  deletedAt?: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
