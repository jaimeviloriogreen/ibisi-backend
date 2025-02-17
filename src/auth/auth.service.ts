import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { SharedService } from "src/shared/shared.service";

import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserLogInDto } from "./dto/login-dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sharedsSercice: SharedService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(
    userLoginAuthDto: UserLogInDto,
  ): Promise<{ access_token: string }> {
    const { password, identification } = userLoginAuthDto;
    const userFound =
      await this.usersService.findOneByIdentification(identification);

    const passwordValidated = await this.sharedsSercice.verifyPassword(
      password,
      userFound.password.toString(),
    );

    if (!passwordValidated)
      throw new UnauthorizedException(`Login unsuccessful`);

    delete userFound.password;

    const payload = { ...userFound };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
  async singIn(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
