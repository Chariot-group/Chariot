import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class MaillingService {

    constructor(private readonly mailerService: MailerService) {}

    private readonly SERVICE_NAME = MaillingService.name;
    private readonly logger = new Logger(this.SERVICE_NAME);


    async sendOTP(username: string, email: string, otp: number) {
        try{
            await this.mailerService.sendMail({
                to: email,
                subject: 'Your OTP code',
                template: './otp',
                context: {
                    username,
                    otp,
                },
            });
            
            this.logger.verbose(`Email send at ${email}`, this.SERVICE_NAME);
        }catch(error) {
            const message = `Error while send otp code at ${email}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new InternalServerErrorException(message);
        }
        
    }

}
