import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Character } from "src/character/schemas/character.schema";
import { Group } from "src/group/schemas/group.schema";

export class Groups {

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }], default: [], required: true })
    main: Group[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }], default: [], required: true })
    pnj: Group[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }], default: [], required: true })
    archived: Group[];
    
}