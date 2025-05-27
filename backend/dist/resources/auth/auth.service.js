"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const mailling_service_1 = require("../../mailling/mailling.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, maillingService, userModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.maillingService = maillingService;
        this.userModel = userModel;
        this.SERVICE_NAME = AuthService_1.name;
        this.logger = new common_1.Logger(this.SERVICE_NAME);
    }
    async validateResourceByEmail(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            const message = `User ${email} not found`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.NotFoundException(message);
        }
        if (user.deletedAt) {
            const message = `User ${email} deleted`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.GoneException(message);
        }
    }
    async validateResourceById(id, changePassword) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            const message = `Error while updating user #${id}: Id is not a valid mongoose id`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.BadRequestException(message);
        }
        let user = await this.userModel.findById(id);
        if (!user) {
            const message = `User #${id} not found`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.NotFoundException(message);
        }
        if (user.deletedAt) {
            const message = `User #${id} deleted`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.GoneException(message);
        }
        if (user.otp == null || changePassword.otp !== user.otp) {
            const message = `Error while updating user #${id}: Otp is incorrect`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.UnauthorizedException(message);
        }
    }
    async signIn(signInDto) {
        try {
            const user = await this.userService.findByEmail(signInDto.email);
            if (!user) {
                const message = `Email or password is incorrect`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.UnauthorizedException(message);
            }
            const checkPassword = await bcrypt.compare(signInDto.password, user.password);
            if (!checkPassword) {
                const message = `Email or password is incorrect`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.UnauthorizedException(message);
            }
            const start = Date.now();
            const token = this.jwtService.sign({
                iss: process.env.BACKEND_URL,
                sub: user._id,
                aud: process.env.FRONTEND_URL,
            });
            const end = Date.now();
            const message = `User ${signInDto.email} logged in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                access_token: token,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            const message = `Error while sign in user ${signInDto.email}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async resetPassword(resetPasswordDto) {
        try {
            const { email, locale } = resetPasswordDto;
            await this.validateResourceByEmail(email);
            const user = await this.userService.findByEmail(email);
            const otp = Math.floor(100000 + Math.random() * 900000);
            const start = Date.now();
            const userUpdate = await this.userModel
                .updateOne({ email: email }, { otp })
                .exec();
            const end = Date.now();
            this.maillingService.sendOTP(user.username, user.email, otp, locale);
            if (userUpdate.modifiedCount === 0) {
                const message = `User ${email} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.NotFoundException(message);
            }
            const message = `User ${email} update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException) {
                throw error;
            }
            const message = `Error while reset password of user ${resetPasswordDto.email}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
    async forgotPassword(id, changePassword) {
        try {
            await this.validateResourceById(id, changePassword);
            if (changePassword.newPassword !== changePassword.confirmPassword) {
                const message = `Error while updating user #${id}: Passwords do not match`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new common_1.BadRequestException(message);
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(changePassword.confirmPassword, saltRounds);
            const start = Date.now();
            const user = await this.userModel
                .updateOne({ _id: id }, {
                password: hashedPassword,
                otp: null,
                updatedAt: new Date(),
            })
                .exec();
            const end = Date.now();
            const message = `Password of #${id} update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.GoneException ||
                error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            const message = `Error while changing password of #${id}: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new common_1.InternalServerErrorException(message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mailling_service_1.MaillingService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map