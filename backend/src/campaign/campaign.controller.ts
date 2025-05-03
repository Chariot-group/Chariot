import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CampaignService } from '@/campaign/campaign.service';
import { CreateCampaignDto } from '@/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/campaign/dto/update-campaign.dto';
import { ParseNullableIntPipe } from '@/pipes/parse-nullable-int.pipe';
import { GroupService } from '@/group/group.service';
import { IsCreatorGuard } from '@/common/guards/is-creator.guard';
import { IsCreator } from '@/common/decorators/is-creator.decorator';

@UseGuards(IsCreatorGuard)
@Controller('campaigns')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly groupService: GroupService,
  ) {}

  private readonly SERVICE_NAME = CampaignController.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  @Post()
  create(@Req() request, @Body() createCampaignDto: CreateCampaignDto) {
    const userId = request.user.userId;

    return this.campaignService.create(createCampaignDto, userId);
  }

  @Get()
  findAll(
    @Req() request,
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('sort') sort?: string,
    @Query('label') label?: string,
  ) {
    const userId = request.user.userId;

    return this.campaignService.findAllByUser(userId, {
      page,
      offset,
      sort,
      label,
    });
  }

  @IsCreator(CampaignService)
  @Get(':id/groups')
  async findAllGroups(
    @Param('id') id: string,
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('sort') sort?: string,
    @Query('label') label?: string,
    @Query('type') type: 'all' | 'main' | 'npc' | 'archived' = 'all',
  ) {
    let checkCampaginId = await this.campaignService.findOne(id);
    if (checkCampaginId.data) {
      return this.groupService.findAll({ page, offset, sort, label }, id, type);
    }
  }

  @IsCreator(CampaignService)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @IsCreator(CampaignService)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @IsCreator(CampaignService)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(id);
  }
}
