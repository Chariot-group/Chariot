import { UserService } from '@/user/user.service';
import { BadRequestException, GoneException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { changePasswordDto } from './dto/changePassword.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { MaillingService } from '@/mailling/mailling.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private maillingService: MaillingService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

      private readonly SERVICE_NAME = AuthService.name;
      private readonly logger = new Logger(this.SERVICE_NAME);

    async signIn(signInDto: SignInDto) {
        try{
            const user = await this.userService.findByEmail(signInDto.email);
            const checkPassword = await bcrypt.compare(signInDto.password, user.password);
            if (!user || !checkPassword) {
                const message = `Email or password is incorrect`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new UnauthorizedException(message);
            }

            const start = Date.now();
            const token = this.jwtService.sign({iss: process.env.BACKEND_URL, sub: user._id, aud: process.env.FRONTEND_URL });
            const end = Date.now();

            const message = `User logged in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                access_token: token,
            }
        }catch (error) {
            if (
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
              ) {
                throw error;
              }
              const message = `Error while sign in user: ${error.message}`;
              this.logger.error(message, null, this.SERVICE_NAME);
              throw new InternalServerErrorException(message);
        }
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        try {

            const { email, local } = resetPasswordDto;

            const user = await this.userService.findByEmail(email);
            if (!user) {
                const message = `User ${email} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new NotFoundException(message);
            }

            if (user.deletedAt) {
                const message = `User ${email} deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new GoneException(message);
            }

            const otp = Math.floor(100000 + Math.random() * 900000);

            const start: number = Date.now();
            const userUpdate = await this.userModel
                .updateOne({ email: email }, {otp})
                .exec();
            const end: number = Date.now();

            this.maillingService.sendOTP(user.username, user.email, otp, local);

            if (userUpdate.modifiedCount === 0) {
                const message = `User #${email} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new NotFoundException(message);
            }
            
            const message = `User update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
            

        }catch (error) {
            if( error instanceof NotFoundException ||
                error instanceof GoneException ) {
                throw error;
            }
            const message = `Error while reset password of user: ${error.message}`;
            this.logger.error(message, null, this.SERVICE_NAME);
            throw new InternalServerErrorException(message);
        }
    }

    async forgotPassword(id: string, changePassword: changePasswordDto){
        try {
            if (!Types.ObjectId.isValid(id)) {
                const message = `Error while updating user #${id}: Id is not a valid mongoose id`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new BadRequestException(message);
            }
            let userCurrent = await this.userModel.findById(id);

            if (!userCurrent) {
                const message = `User #${id} not found`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new NotFoundException(message);
            }

            if (userCurrent.deletedAt) {
                const message = `User #${id} deleted`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new GoneException(message);
            }

            if(userCurrent.otp == null || changePassword.otp !== userCurrent.otp) {
                const message = `Error while updating user #${id}: Otp is incorrect`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new UnauthorizedException(message);
            }

            if (changePassword.newPassword !== changePassword.confirmPassword) {
                const message = `Error while updating user #${id}: Passwords do not match`;
                this.logger.error(message, null, this.SERVICE_NAME);
                throw new BadRequestException(message);
            }

            // Hash the password
            const saltRounds = 10;
            const hashedPassword: string = await bcrypt.hash(changePassword.confirmPassword, saltRounds);

            const start: number = Date.now();
            const user = await this.userModel.updateOne({_id: id}, {
                password: hashedPassword,
                otp: null,
                updatedAt: new Date()
            }).exec();
            const end: number = Date.now();

            const message = `Password update in ${end - start}ms`;
            this.logger.verbose(message, this.SERVICE_NAME);
            return {
                message,
                data: user,
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof NotFoundException ||
                error instanceof GoneException ||
                error instanceof UnauthorizedException
              ) {
                throw error;
              }
              const message = `Error while changing password: ${error.message}`;
              this.logger.error(message, null, this.SERVICE_NAME);
              throw new InternalServerErrorException(message);
        }
    }
}
