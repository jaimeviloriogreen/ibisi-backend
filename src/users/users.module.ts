import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import { RolesModule } from "src/roles/roles.module";
import { TeachersModule } from "src/teachers/teachers.module";
import { StudentsModule } from "src/students/students.module";
import { AdminModule } from "src/admin/admin.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SharedModule,
    RolesModule,
    TeachersModule,
    StudentsModule,
    AdminModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
