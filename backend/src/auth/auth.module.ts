import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Algorithm } from 'jsonwebtoken';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        privateKey: configService.get<string>('JWT_SECRET_KEY', 'defaultSecretKey'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRATION', '60s'), 
          algorithm: configService.get<Algorithm>('JWT_ALGORITHM', 'HS256') as Algorithm 
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
