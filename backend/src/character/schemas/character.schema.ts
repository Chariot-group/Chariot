import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Classification } from './classification/classification.schema';
import { Stats } from './stat/stats.schema';
import { Combat } from './combat/combat.schema';
import { Traits } from './trait/trait.schema';
import { Actions } from './actions/actions.schema';

export type CharacterDocument = Character & Document;

@Schema({timestamps: true})
export class Character {
    
    @Prop({ required: true })
    name: string;

    @Prop({ type: Classification, required: true })
    classification: Classification;

    @Prop({ type: Stats, required: true })
    stats: Stats;

    @Prop({ type: Combat, required: true })
    combat: Combat;

    @Prop({ type: Traits, required: true })
    traits: Traits;

    @Prop({ type: Actions, required: true })
    actions: Actions;

    @Prop({ default: null })
    deletedAt?: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);