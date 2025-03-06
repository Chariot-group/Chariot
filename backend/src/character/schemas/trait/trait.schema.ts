import { Prop } from "@nestjs/mongoose";
import { Ability } from "./sub/ability.schema";

export class Traits {
    @Prop({ type: [String], required: true })
    languages: string[];
  
    @Prop({ type: [Ability], default: [] })
    abilities: Ability[];
}