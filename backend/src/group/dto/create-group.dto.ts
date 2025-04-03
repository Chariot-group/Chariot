import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CampaignGroupDto } from './sub/campaigns.dto';
import { Type } from 'class-transformer';

export class CreateGroupDto {

    @IsString()
    @MaxLength(50)
    readonly label: string;
    
    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsArray()
    @IsOptional()
    @IsMongoId({ each: true })
    readonly characters?: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CampaignGroupDto)
    readonly campaigns: CampaignGroupDto[];

}
