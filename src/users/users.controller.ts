import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  BadRequestException,
  Patch,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

import { UUID } from "crypto";
import { User } from "./entities/user.entity";
import { UserAuth } from "./decorators/user.decorator";
import { Role } from "src/roles/decorators/role.decorator";
import { RolesEnum } from "src/roles/enums/role.enum";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Role(RolesEnum.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException("Las contraseñas no coinciden.");
    }

    return this.usersService.create(createUserDto);
  }

  @Role(RolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Role(RolesEnum.ADMIN)
  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.usersService.findOne(uuid);
  }

  @Patch(":uuid")
  updateOne(
    @Param("uuid", ParseUUIDPipe) uuid: UUID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(uuid, updateUserDto);
  }

  @Post("profile")
  async getUserProfile(@UserAuth() user: User) {
    const userAuth = await this.usersService.findOne(user.uuid as UUID);
    return userAuth;
  }
}
