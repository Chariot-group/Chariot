import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaign.dto';
import { IsOptional } from 'class-validator';

export class UpdateCampaignDto extends PartialType(
  OmitType(CreateCampaignDto, ['label'] as const)
) {
  @IsOptional()
  readonly label?: string;
}
