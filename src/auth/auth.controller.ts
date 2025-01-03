import { Controller, Post, Body, HttpCode, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { Public } from "./decorators/public.decorator";
import { Response } from "express";
import { COOKIE_MAX_AGE } from "src/configs/constants";
import { HttpStatus } from "@nestjs/common";
import { UserLogInDto } from "./dto/login-dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async logIn(
    @Body() userLoginAuthDto: UserLogInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.logIn(userLoginAuthDto);

    response.cookie("auth_token", token.access_token, {
      httpOnly: true,
      secure: process.env.IBISI_NODE_ENV === "production", // True only in HTTPS
      sameSite: "lax", // strict",
      maxAge: COOKIE_MAX_AGE,
    });

    return token;
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.OSFIT_NODE_ENV === "production",
      sameSite: "lax",
    });
    return { message: "Logout successful" };
  }
}
