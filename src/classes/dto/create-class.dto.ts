import { Transform } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
  IsUUID,
  Matches,
} from "class-validator";
import { ClassesDay, ClassesSections } from "../enums/classes.enums";
import { UUID } from "crypto";

export class CreateClassDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  end_date: Date;

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
