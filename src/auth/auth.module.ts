import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SharedModule } from "src/shared/shared.module";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRATION_TIME } from "src/configs/constants";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    SharedModule,
    JwtModule.register({
      global: true,
      secret: process.env.IBISI_JWT,
      signOptions: { expiresIn: `${JWT_EXPIRATION_TIME}s` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
