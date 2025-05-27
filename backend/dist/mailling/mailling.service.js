"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MaillingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaillingService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const fs = require("fs/promises");
const path = require("path");
let MaillingService = MaillingService_1 = class MaillingService {
    constructor() {
        this.SERVICE_NAME = MaillingService_1.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    async sendOTP(username, email, otp, local) {
        try {
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: Boolean(process.env.SMTP_SECURE),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            let infos = null;
            switch (local) {
                case 'fr':
                    infos = {
                        subjetct: 'Votre code OTP',
                        template: 'otpFr',
                    };
                    break;
                case 'es':
                    infos = {
                        subjetct: 'Su código OTP',
                        template: 'otpEs',
                    };
                    break;
                default:
                    infos = {
                        subjetct: 'Your OTP code',
                        template: 'otpEn',
                    };
                    break;
            }
            const html = await fs.readFile(path.resolve(`src/mailling/templates/${infos.template}.html`), 'utf8');
            await transporter.sendMail({
                to: email,
                from: `"No Reply" <${process.env.RECEIVER_EMAIL}>`,
                subject: infos.subjetct,
                html: html
                    .replace('{{username}}', username)
                    .replace('{{otp}}', otp.toString()),
            });
            this.logger.verbose(`Email send at ${email} in ${local}`, this.SERVICE_NAME);
        }
        catch (error) {
            const message = `Error while send otp code at ${email}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.MaillingService = MaillingService;
exports.MaillingService = MaillingService = MaillingService_1 = __decorate([
    (0, common_1.Injectable)()
], MaillingService);
//# sourceMappingURL=mailling.service.js.map