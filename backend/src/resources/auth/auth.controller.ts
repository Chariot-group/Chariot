import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from '@/resources/auth/auth.service';
import { SignInDto } from '@/resources/auth/dto/signIn.dto';
import { CreateUserDto } from '@/resources/user/dto/create-user.dto';
import { UserService } from '@/resources/user/user.service';
import { ResetPasswordDto } from '@/resources/auth/dto/resetPassword.dto';
import { changePasswordDto } from '@/resources/auth/dto/changePassword.dto';
import { Public } from '@/common/decorators/public.decorator';
import verifyOTPDto from '@/resources/auth/dto/verifyOTPDto.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Public()
  @Post('/login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Patch(':id/change-password')
  forgotPassword(
    @Param('id') id: string,
    @Body() changePassword: changePasswordDto,
  ) {
    return this.authService.forgotPassword(id, changePassword);
  }

  @Public()
  @Post(':id/verify-otp')
  verifyOTP(
    @Param('id') id: string,
    @Body() verifyOTP: verifyOTPDto,
  ) {
    return this.authService.verifyOTP(id, verifyOTP);
  }

  @Public()
  @Patch('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
