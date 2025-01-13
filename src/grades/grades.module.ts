import { Module } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { GradesController } from "./grades.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { SubjectsModule } from "src/subjects/subjects.module";
import { StudentsModule } from "src/students/students.module";
import { TeachersModule } from "src/teachers/teachers.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade]),
    SubjectsModule,
    StudentsModule,
    TeachersModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
