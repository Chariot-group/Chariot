import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: SignInDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
