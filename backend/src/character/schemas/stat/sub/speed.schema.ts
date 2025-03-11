import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Speed {
    
    @Prop({ required: false })
    walk?: number;

    @Prop({ required: false })
    climb?: number;

    @Prop({ required: false })
    swim?: number;

    @Prop({ required: false })
    fly?: number;

    @Prop({ required: false })
    burrow?: number;
}