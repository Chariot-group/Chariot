import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Campaign } from 'src/campaign/schemas/campaign.schema';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: number;

    @Prop({ required: true })
    password: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }], default: [], required: true })
    campaigns: Campaign[];

    @Prop({ default: null })
    deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);