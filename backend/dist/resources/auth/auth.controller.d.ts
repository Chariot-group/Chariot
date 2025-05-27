import { AuthService } from '@/resources/auth/auth.service';
import { SignInDto } from '@/resources/auth/dto/signIn.dto';
import { CreateUserDto } from '@/resources/user/dto/create-user.dto';
import { UserService } from '@/resources/user/user.service';
import { ResetPasswordDto } from '@/resources/auth/dto/resetPassword.dto';
import { changePasswordDto } from '@/resources/auth/dto/changePassword.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(signInDto: SignInDto): Promise<{
        message: string;
        access_token: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").UserDocument, {}> & import("../user/schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    forgotPassword(id: string, changePassword: changePasswordDto): Promise<{
        message: string;
        data: import("mongoose").UpdateWriteOpResult;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").UserDocument, {}> & import("../user/schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
