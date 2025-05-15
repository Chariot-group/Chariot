import { Prop } from "@nestjs/mongoose";
import { Action } from "@/resources/character/schemas/actions/sub/action.schema";

export class Actions {
    
    @Prop({ type: [Action], default: [] })
    standard: Action[];
  
    @Prop({ type: [Action], default: [] })
    legendary: Action[];
  
    @Prop({ type: [Action], default: [] })
    lair: Action[];
  }