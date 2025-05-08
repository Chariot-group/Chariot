import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Challenge {
  @Prop({ required: true })
  challengeRating: number;

  @Prop({ required: true })
  experiencePoints: number;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
