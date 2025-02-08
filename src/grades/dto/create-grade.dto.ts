import { IsNotEmpty, IsOptional, IsUUID, Max, Min } from "class-validator";
import { UUID } from "crypto";

export class CreateGradeDto {
  @Max(100)
  @Min(0)
  @IsNotEmpty()
  practices: number;

  @Max(100)
  @Min(0)
  @IsNotEmpty()
  participations: number;

  @Max(100)
  @Min(0)
  @IsNotEmpty()
  attendance: number;

  @Max(100)
  @Min(0)
  @IsNotEmpty()
  exams: number;

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
