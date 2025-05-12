import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Profile {
  @Prop()
  alignment?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

@Schema({ _id: false })
export class PlayerProfile extends Profile {
  @Prop()
  race?: string;

  @Prop()
  subrace?: string;
}

export const PlayerProfileSchema = SchemaFactory.createForClass(PlayerProfile);

@Schema({ _id: false })
export class NPCProfile extends Profile {
  @Prop()
  type?: string;

  @Prop()
  subtype?: string;
}

export const NPCProfileSchema = SchemaFactory.createForClass(NPCProfile);
