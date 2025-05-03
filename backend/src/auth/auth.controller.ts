import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SignInDto } from '@/auth/dto/signIn.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { ResetPasswordDto } from '@/auth/dto/resetPassword.dto';
import { changePasswordDto } from '@/auth/dto/changePassword.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Patch(':id/change-password')
  forgotPassword(
    @Param('id') id: string,
    @Body() changePassword: changePasswordDto,
  ) {
    return this.authService.forgotPassword(id, changePassword);
  }

  @Patch('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      return this.authService.resetPassword(resetPasswordDto);
  }
}
