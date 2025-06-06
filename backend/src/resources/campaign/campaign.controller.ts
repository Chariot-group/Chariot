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
import { CampaignService } from '@/resources/campaign/campaign.service';
import { CreateCampaignDto } from '@/resources/campaign/dto/create-campaign.dto';
import { UpdateCampaignDto } from '@/resources/campaign/dto/update-campaign.dto';
import { ParseNullableIntPipe } from '@/common/pipes/parse-nullable-int.pipe';
import { GroupService } from '@/resources/group/group.service';
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
    @Req() request,
    @Param('id') id: string,
    @Query('page', ParseNullableIntPipe) page?: number,
    @Query('offset', ParseNullableIntPipe) offset?: number,
    @Query('sort') sort?: string,
    @Query('label') label?: string,
    @Query('type') type: 'all' | 'main' | 'npc' | 'archived' = 'all',
    @Query('onlyWithMembers') onlyWithMembers?: boolean,
  ) {
    const userId = request.user.userId;

    let checkCampaginId = await this.campaignService.findOne(id);
    if (checkCampaginId.data) {
      return this.groupService.findAllByUser(
        userId,
        { page, offset, sort, label, onlyWithMembers },
        id,
        type,
      );
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
