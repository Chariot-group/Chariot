import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Subscribe {

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    expired_at: Date;

    @Prop({ required: true })
    started_at: Date;

    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    priceId: string;
}

export const SubscribeSchema = SchemaFactory.createForClass(Subscribe);
