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

  constructor(@InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>){}

  private readonly logger = new Logger(CampaignService.name);
  private readonly SERVICE_NAME = CampaignService.name;

  create(createCampaignDto: CreateCampaignDto) {
    return 'This action adds a new campaign';
  }

  findAll() {
    return `This action returns all campaign`;
  }

  async findOne(id: string): Promise<IResponse> {
    try{

      if(!Types.ObjectId.isValid(id)){
        this.logger.error(`Erreur lors de la récupération de la campagne #${id}`, "L'id n'est pas un id valide pour mongoose", this.SERVICE_NAME);
        return ResponseService.sendResponse(`Impossible de trouver la campagne #${id}`, {}, [ResponseService.setError("mongoose_id_not_valid", "critique")]);
      }

      const start: number = Date.now();
      const campaing = await this.campaignModel.findOne({_id: id}).exec();
      const end: number = Date.now();

      if(!campaing){
        this.logger.error(`Campagne #${id} introuvable`, null, this.SERVICE_NAME);
        return ResponseService.sendResponse(`Impossible de trouver la campagne #${id}`, {}, [ResponseService.setError("invalid_campaing_id", "critique")]);
      }

      this.logger.verbose(`Campagne #${id} trouvé en ${end - start} ms`, this.SERVICE_NAME);
      return ResponseService.sendResponse(`Campagne #${id} tropuvé avec succès`, campaing, []);

    }catch(error){
      this.logger.error(`Erreur lors de la récupération de la campagne #${id}`, error.message, this.SERVICE_NAME);
      return ResponseService.sendResponse(`Impossible de trouver la campagne #${id}`, {}, [ResponseService.setError("internal_error", "critique")]);
    }
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
function setError(): import("src/types/response").IError {
  throw new Error('Function not implemented.');
}

