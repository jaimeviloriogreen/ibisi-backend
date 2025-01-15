import { ConflictException, Injectable } from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./entities/grade.entity";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectsService } from "src/subjects/subjects.service";
import { StudentsService } from "src/students/students.service";
import { TeachersService } from "src/teachers/teachers.service";
import { User } from "src/users/entities/user.entity";
import { plainToInstance } from "class-transformer";

@Injectable()
export class GradesService {
  // constructor(private readonly dataSource: DataSource) {}
  constructor(
    @InjectRepository(Grade)
    private readonly gradesRepository: Repository<Grade>,
    private readonly subjectsServise: SubjectsService,
    private readonly studentsServise: StudentsService,
    private readonly teachersServise: TeachersService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createGradeDto: CreateGradeDto) {
    return await this.dataSource.transaction(async (manager) => {
      try {
        const subject = await this.subjectsServise.findOne(
          createGradeDto.subjectId,
          manager,
        );

        const student = await this.studentsServise.findOne(
          createGradeDto.studentId,
          manager,
        );

        const teacher = createGradeDto.teacherId
          ? await this.teachersServise.findOne(
              createGradeDto.teacherId,
              manager,
            )
          : null;

        const grade = manager.getRepository(Grade).create({
          final_grade: createGradeDto.final_grade,
          teacher_comments: createGradeDto.teacher_comments,
          internal_notes: createGradeDto.internal_notes,
          student,
          subject,
          teacher,
        });

        // await manager.save(Grade, grade);
        return await manager.getRepository(Grade).save(grade);
      } catch (error) {
        if (error.code === "23505") {
          throw new ConflictException(
            "Esta calificación para este estudiante y asignatura ya existe.",
          );
        }
        throw error;
      }
    });
  }

  findAll() {
    const grades = this.gradesRepository.find({
      relations: { student: { user: true } },
    });
    const sanitizedGrades = plainToInstance(User, grades);
    return sanitizedGrades;
  }

  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
