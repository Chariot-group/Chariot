import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Character } from '@/character/schemas/character.schema';
import mongoose from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({timestamps: true})
export class Group {
    
    @Prop({ required: true })
    label: string;

    @Prop({ required: false })
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }], default: [], required: true })
    characters: Character[];

    @Prop({ default: null })
    deletedAt?: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);