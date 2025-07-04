import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Campaign } from '@/resources/campaign/schemas/campaign.schema';
import mongoose from 'mongoose';
import { Subscribe } from '@/resources/user/schemas/subscribe/subscribe.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: null, maxlength: 6 })
  otp?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [Subscribe], default: [] })
  subscriptions: Subscribe[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
    default: [],
    required: true,
  })
  campaigns: Campaign[];

  @Prop({ default: null })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
