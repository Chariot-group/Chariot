import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SubscribeDto } from '@/resources/user/dto/subscription/subscription.dto';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsArray()
  @IsOptional()
  readonly subscriptions?: SubscribeDto[];

  @IsString()
  readonly password: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly campaigns?: string[];
}
