import { Prop } from "@nestjs/mongoose";

export class SavingThrows {
    @Prop({ default: 0 })
    dexterity: number;
}