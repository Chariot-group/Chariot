import { Prop } from "@nestjs/mongoose";

export class Groups {

    @Prop({ required: true, default: [] })
    main: [string];
    
    @Prop({ required: true, default: [] })
    pnj: [string];

    @Prop({ required: true, default: [] })
    archived: [string];
}