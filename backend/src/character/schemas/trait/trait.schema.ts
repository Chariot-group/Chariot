import { Prop } from "@nestjs/mongoose";
import { Ability } from "@/character/schemas/trait/sub/ability.schema";

export class Traits {
    @Prop({ type: [String], required: true })
    languages: string[];
  
    @Prop({ type: [Ability], default: [] })
    abilities: Ability[];
}