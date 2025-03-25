import { Injectable, Logger } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import IResponse from 'src/types/response';
import { ResponseService } from 'src/response/response.service';

@Injectable()
export class CampaignService {

  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>){}

  private readonly logger = new Logger(CampaignService.name);
  private readonly SERVICE_NAME = CampaignService.name;

  private readonly MONGOOSE_ERROR_ID: string = "external_mongoose_id_error";
  private readonly RESOURCE_NOT_FIND: string = "external_resource_not_find";
  private readonly RESOURCE_FIND: string = "external_resource_find";
  private readonly RESOURCE_NOT_FIND_LOG: string = "internal_resource_not_find";
  private readonly RESOURCE_FIND_LOG: string = "internal_resource_find";

  create(createCampaignDto: CreateCampaignDto) {
    return 'This action adds a new campaign';
  }

  findAll() {
    return `This action returns all campaign`;
  }

  async findOne(id: string): Promise<IResponse> {
    try{

      if(!Types.ObjectId.isValid(id)){
        this.logger.error(ResponseService.getErrorMessage(this.MONGOOSE_ERROR_ID, ['la campagne', id]), null, this.SERVICE_NAME);
        return ResponseService.sendResponse(ResponseService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), {}, [ResponseService.setError("mongoose_id_not_valid", "critical")]);
      }

      const start: number = Date.now();
      const campaign = await this.campaignModel.findById(id)
        .populate({path: 'groups.main', populate: {path: 'characters'}})
        .populate({path: 'groups.pnj', populate: {path: 'characters'}})
        .populate({path: 'groups.archived', populate: {path: 'characters'}})
        .exec();
      const end: number = Date.now();

      if(!campaign){
        this.logger.error(ResponseService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), null, this.SERVICE_NAME);
        return ResponseService.sendResponse(ResponseService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), {}, [ResponseService.setError("invalid_campaign_id", "critical")]);
      }

      this.logger.verbose(ResponseService.getErrorMessage(this.RESOURCE_FIND_LOG, ['Campagne', id, (end - start).toString()]), this.SERVICE_NAME);
      return ResponseService.sendResponse(ResponseService.getErrorMessage(this.RESOURCE_FIND, ['la campagne', id]), campaign, []);

    }catch(error){
      this.logger.error(ResponseService.getErrorMessage(this.RESOURCE_NOT_FIND_LOG, ['la campagne', id, error.message]), null, this.SERVICE_NAME);
      return ResponseService.sendResponse(ResponseService.getErrorMessage(this.RESOURCE_NOT_FIND, ['la campagne', id]), {}, [ResponseService.setError("internal_error", "critical")]);
    }
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}

