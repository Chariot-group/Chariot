import { Profile } from '@/resources/character/schemas/profile/profile.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NPCProfile extends Profile {
  @Prop()
  type?: string;

  @Prop()
  subtype?: string;
}

export const NPCProfileSchema = SchemaFactory.createForClass(NPCProfile);
