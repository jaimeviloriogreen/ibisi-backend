import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { RolesEnum, RolesPermissions } from "../enums/role.enum";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(RolesEnum)
  readonly name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RolesPermissions, { each: true })
  readonly permissions: RolesPermissions[];
}
