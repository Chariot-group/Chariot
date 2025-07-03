import { IsDateString, IsString } from "class-validator";

export class SubscribeDto {
    @IsDateString()
    readonly expired_at: Date;

    @IsDateString()
    readonly started_at: Date;

    @IsString()
    readonly productId: string;
}