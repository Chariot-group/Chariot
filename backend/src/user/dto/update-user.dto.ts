import { IsArray, IsMongoId, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @MaxLength(255)
    readonly username?: string;

    @IsArray()
    @IsMongoId({ each: true })
    readonly campaigns?: string[];

}
