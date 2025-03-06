import { Prop } from "@nestjs/mongoose";

export class Speed {
    @Prop({ required: true })
    walk: number;
}