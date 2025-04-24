import { Body, Controller, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('/login')
    login(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Post('/register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Patch('/resetPassword')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
}
