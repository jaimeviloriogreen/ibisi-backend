import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { Roles, RolesPermissions } from '../enums/role.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(Roles)
  readonly name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RolesPermissions, { each: true })
  readonly permissions: RolesPermissions[];
}
