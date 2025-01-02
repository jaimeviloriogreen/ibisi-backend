import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

import { UUID } from "crypto";
import { User } from "./entities/user.entity";
import { UserAuth } from "./decorators/user.decorator";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.usersService.findOne(uuid);
  }

  @Post("profile")
  async getUserProfile(@UserAuth() user: User) {
    const userAuth = await this.usersService.findOne(user.uuid as UUID);
    return userAuth;
  }
}
