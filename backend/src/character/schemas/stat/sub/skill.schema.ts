import { Prop } from "@nestjs/mongoose";

export class Skills {
    @Prop({ default: 0 })
    stealth: number;
}
  