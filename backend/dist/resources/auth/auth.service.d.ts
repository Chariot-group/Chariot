import { UserService } from '@/resources/user/user.service';
import { SignInDto } from '@/resources/auth/dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { changePasswordDto } from '@/resources/auth/dto/changePassword.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/resources/user/schemas/user.schema';
import { MaillingService } from '@/mailling/mailling.service';
import { ResetPasswordDto } from '@/resources/auth/dto/resetPassword.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private maillingService;
    private userModel;
    constructor(userService: UserService, jwtService: JwtService, maillingService: MaillingService, userModel: Model<UserDocument>);
    private readonly SERVICE_NAME;
    private readonly logger;
    private validateResourceByEmail;
    private validateResourceById;
    signIn(signInDto: SignInDto): Promise<{
        message: string;
        access_token: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    forgotPassword(id: string, changePassword: changePasswordDto): Promise<{
        message: string;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
}
