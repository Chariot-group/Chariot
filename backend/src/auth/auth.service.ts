import { UserService } from '@/user/user.service';
import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
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
}
