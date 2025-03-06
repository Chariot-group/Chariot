import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({timestamps: true})
export class Campaign {
    
    @Prop({ required: true })
    label: string;

    @Prop({ required: false })
    description: string;

    @Prop({ default: null })
    deletedAt?: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);