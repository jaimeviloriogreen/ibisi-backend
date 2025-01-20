import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  MinLength,
} from "class-validator";
import { UUID } from "crypto";

export class CreateGradeDto {
  @Max(100)
  @IsPositive()
  @IsNotEmpty()
  final_grade: number;

  @IsOptional()
  @IsNotEmpty()
  teacher_comments: string;

  @IsOptional()
  @IsNotEmpty()
  internal_notes: string;

  @IsUUID("4")
  @IsNotEmpty()
  studentId: UUID;

  @IsUUID("4")
  @IsNotEmpty()
  subjectId: UUID;

  @IsOptional()
  @IsUUID("4")
  @IsNotEmpty()
  teacherId: UUID;
}
