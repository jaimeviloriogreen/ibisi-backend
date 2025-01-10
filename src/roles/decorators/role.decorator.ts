import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "../enums/role.enum";

export const ROLE_KEY = "role";
export const Role = (...role: RolesEnum[]) => SetMetadata(ROLE_KEY, role);
