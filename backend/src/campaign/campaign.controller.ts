import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CampaignService } from '@/campaign/campaign.service';
import { CreateCampaignDto } from '@/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/campaign/dto/update-campaign.dto';
import { ParseNullableIntPipe } from '@/pipes/parse-nullable-int.pipe';
import { GroupService } from '@/group/group.service';
import { Types } from 'mongoose';

@Controller('campaigns')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly groupService: GroupService
  ) {}

  private readonly SERVICE_NAME = CampaignController.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  findAll(
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('sort') sort?: string,
    @Query('label') label?: string,
  ) {
    return this.campaignService.findAll({ page, offset, sort, label });
  }

  @Get(':id/groups')
  async findAllGroups(
    @Param('id') id: string,
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('sort') sort?: string,
    @Query('label') label?: string,
    @Query('type') type: "all" | "main" | "npc" | "archived" = "all"
  ) {
    let checkCampaginId = await this.campaignService.findOne(id);
    if (checkCampaginId.data) {
      return this.groupService.findAll({ page, offset, sort, label }, id, type);
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(id);
  }
}
