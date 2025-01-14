import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { StudentsModule } from "src/students/students.module";
import { TeachersModule } from "src/teachers/teachers.module";
import { ClassesModule } from "src/classes/classes.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    StudentsModule,
    TeachersModule,
    ClassesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
