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
  Length,
  ValidateNested,
} from "class-validator";

import { Gender } from "../enums/user.enums";
import { RolesEnum } from "src/roles/enums/role.enum";
import { Type } from "class-transformer";
import { CreateStudentDto } from "src/students/dto/create-student.dto";

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

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0,
  })
  confirmPassword: string;

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
  readonly address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;

  @IsNotEmpty()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @ValidateNested()
  @Type(() => CreateStudentDto)
  student?: CreateStudentDto;
}
