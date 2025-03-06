import { Prop } from '@nestjs/mongoose';

export class Classification {
    @Prop({ required: true })
    type: string;
  
    @Prop({ required: true })
    subtype: string;
  
    @Prop({ required: true })
    alignment: string;
  
    @Prop({ required: true })
    size: string;
}