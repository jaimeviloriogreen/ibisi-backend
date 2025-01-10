import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateTeacherDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
