import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class MaillingService {

    constructor(private readonly mailerService: MailerService) {}

    private readonly SERVICE_NAME = MaillingService.name;
    private readonly logger = new Logger(this.SERVICE_NAME);


    async sendOTP(username: string, email: string, otp: number, local: string) {
        try{

            let infos: {subjetct: string, template: string} = null;
            switch (local) {
                case 'fr':
                    infos = {
                        subjetct: 'Votre code OTP',
                        template: './otpFr',
                    };
                    break;
                case 'es':
                    infos = {
                        subjetct: 'Su código OTP',
                        template: './otpEs',
                    };
                    break;
                default:
                    infos = {
                        subjetct: 'Your OTP code',
                        template: './otpEn',
                    };
                    break;
            }

            await this.mailerService.sendMail({
                to: email,
                subject: infos.subjetct,
                template: infos.template,
                context: {
                    username,
                    otp,
                },
            });
            
            this.logger.verbose(`Email send at ${email} in ${local}`, this.SERVICE_NAME);
        }catch(error) {
            const message = `Error while send otp code at ${email}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new InternalServerErrorException(message);
        }
        
    }

}
