import { Module } from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { ClassesController } from "./classes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Class } from "./entities/class.entity";
import { SubjectsModule } from "src/subjects/subjects.module";
import { TeachersModule } from "src/teachers/teachers.module";
import { StudentsModule } from "src/students/students.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    SubjectsModule,
    TeachersModule,
    StudentsModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
