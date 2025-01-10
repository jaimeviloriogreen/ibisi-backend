import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import {
  StudentLevel,
  StudentAccountStatus,
  StudentStatus,
} from "../enums/student.enums";
import { Transform } from "class-transformer";

export class CreateStudentDto {
  @IsNotEmpty()
  @IsEnum(StudentLevel)
  level: StudentLevel;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  registration_date: Date;

  @IsNotEmpty()
  @IsEnum(StudentAccountStatus)
  acount_status: StudentAccountStatus;

  @IsNotEmpty()
  @IsEnum(StudentStatus)
  status: StudentStatus;

  @IsNotEmpty()
  @IsBoolean()
  scholarship: boolean;
}
