import { UserService } from '@/user/user.service';
import { GoneException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

      private readonly SERVICE_NAME = UserService.name;
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

            const { email } = resetPasswordDto;

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
}
