import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Classification } from './classification/classification.schema';
import { Stats } from './stat/stats.schema';
import { Combat } from './combat/combat.schema';
import { Traits } from './trait/trait.schema';
import { Actions } from './actions/actions.schema';
import { Group } from '@/group/schemas/group.schema';

export type CharacterDocument = Character & Document;

@Schema({timestamps: true})
export class Character {

    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;
    
    @Prop({ required: true })
    name: string;

    @Prop({ type: Classification, required: true })
    classification: Classification;

    @Prop({ type: Stats, required: true })
    stats: Stats;

    @Prop({ type: Combat, required: true })
    combat: Combat;

    @Prop({ type: [Traits], required: true, default: [] })
    traits: Traits[];

    @Prop({ type: [Actions], required: true, default: [] })
    actions: Actions[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], default: [], required: true })
    groups: Group[];

    @Prop({ default: null })
    deletedAt?: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);