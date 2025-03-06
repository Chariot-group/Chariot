import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({timestamps: true})
export class Group {
    
    @Prop({ required: true })
    label: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, default: true })
    active: boolean;

    @Prop({ required: true, default: [] })
    characters: [string];

    @Prop({ default: null })
    deletedAt?: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);