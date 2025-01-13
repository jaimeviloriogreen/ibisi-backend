import { IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateSubjectDto {
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  code: string;

  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  period: string;

  @IsNotEmpty()
  @IsPositive()
  credits: number;
}
