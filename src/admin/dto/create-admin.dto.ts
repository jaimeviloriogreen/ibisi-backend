import { IsNotEmpty } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty()
  userId: number;
}
