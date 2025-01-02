import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from "class-validator";
import { UUID } from "crypto";
import { Gender } from "../enums/user.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly fname: string;

  @IsNotEmpty()
  @IsString()
  readonly lname: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  readonly identification: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Length(10, 10, { each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly phones: string[];

  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly adddress: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;

  @IsNotEmpty()
  @IsUUID("4")
  role: UUID;
}
