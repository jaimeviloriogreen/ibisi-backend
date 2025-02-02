import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  BadRequestException,
  Patch,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

import { UUID } from "crypto";
import { User } from "./entities/user.entity";
import { UserAuth } from "./decorators/user.decorator";
import { Role } from "src/roles/decorators/role.decorator";
import { RolesEnum } from "src/roles/enums/role.enum";
import { UpdateUserDto, UpdateUserPasswordDto } from "./dto/update-user.dto";

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
  findAll(
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Role(RolesEnum.ADMIN)
  @Get("search")
  searchUsers(
    @Query("q") query: string,
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
  ) {
    return this.usersService.searchUsers(query, page, limit);
  }

  @Role(RolesEnum.ADMIN)
  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.usersService.findOne(uuid);
  }

  @Patch("profile/:uuid")
  updateOneProfile(
    @Param("uuid", ParseUUIDPipe) uuid: UUID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOneProfile(uuid, updateUserDto);
  }

  @Patch("password/:uuid")
  updateOnePassword(
    @Param("uuid", ParseUUIDPipe) uuid: UUID,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { password, confirmPassword } = updateUserPasswordDto;

    if (password !== confirmPassword) {
      throw new BadRequestException("Las contraseñas no coinciden.");
    }
    return this.usersService.updateOnePassword(uuid, updateUserPasswordDto);
  }

  @Post("profile")
  async getUserProfile(@UserAuth() user: User) {
    const userAuth = await this.usersService.findOne(user.uuid as UUID);
    return userAuth;
  }
}
