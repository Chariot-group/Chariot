import { UserService } from '@/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    private readonly SERVICE_NAME;
    private readonly logger;
    signIn(signInDto: SignInDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
