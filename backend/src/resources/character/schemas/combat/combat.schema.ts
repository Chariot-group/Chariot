import { Prop } from "@nestjs/mongoose";

export class Combat {
    
    @Prop({ required: true })
    challengeRating: number;
  
    @Prop({ required: true })
    experiencePoints: number;
  
    @Prop({ type: [String], default: [] })
    resistances: string[];
  
    @Prop({ type: [String], default: [] })
    immunities: string[];
  
    @Prop({ type: [String], default: [] })
    vulnerabilities: string[];
}
  