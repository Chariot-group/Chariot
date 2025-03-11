import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Speed {
    
    @Prop({ required: true })
    walk: number;

    @Prop({ required: true })
    climb: number;

    @Prop({ required: true })
    swim: number;

    @Prop({ required: true })
    fly: number;

    @Prop({ required: true })
    burrow: number;
}