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
    const isProduction = process.env.IBISI_NODE_ENV === "production";

    response.cookie("auth_token", token.access_token, {
      httpOnly: true,
      secure: isProduction, // True only in HTTPS
      sameSite: process.env.IBISI_SAME_SITE as "lax" | "strict" | "none",
      maxAge: COOKIE_MAX_AGE,
      domain: isProduction ? ".ibisi.edu.do" : undefined,
    });

    return token;
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    const isProduction = process.env.IBISI_NODE_ENV === "production";

    response.clearCookie("auth_token", {
      httpOnly: true,
      secure: isProduction, // True only in HTTPS
      sameSite: process.env.IBISI_SAME_SITE as "lax" | "strict" | "none",
      domain: isProduction ? ".ibisi.edu.do" : undefined,
    });
    return { message: "Logout successful" };
  }
}
