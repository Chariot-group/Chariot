import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Character } from 'src/character/schemas/character.schema';

export type GroupDocument = Group & Document;

@Schema({timestamps: true})
export class Group {
    
    @Prop({ required: true })
    label: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, default: true })
    active: boolean;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Character' }], default: [], required: true })
    characters: Character[];

    @Prop({ default: null })
    deletedAt?: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);