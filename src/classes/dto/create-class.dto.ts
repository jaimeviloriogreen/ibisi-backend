import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ClassesDay, ClassesSections } from "../enums/classes.enums";
import { UUID } from "crypto";

export class CreateClassDto {
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
    message: "The time format must be HH:MM",
  })
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
    message: "The time format must be HH:MM",
  })
  @IsString()
  end_time: string;

  @IsNotEmpty()
  @IsEnum(ClassesSections)
  section: ClassesSections;

  @IsNotEmpty()
  @IsEnum(ClassesDay)
  day: ClassesDay;

  @IsNotEmpty()
  @IsUUID("4")
  teacherId: UUID;

  @IsNotEmpty()
  @IsUUID("4")
  subjectId: UUID;

  @IsUUID("4", { each: true })
  @ArrayNotEmpty()
  @IsArray()
  studentsId: UUID[];

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
new Date("2025-01-13");
