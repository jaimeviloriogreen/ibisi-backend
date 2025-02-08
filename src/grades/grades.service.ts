import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./entities/grade.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectsService } from "src/subjects/subjects.service";
import { StudentsService } from "src/students/students.service";
import { TeachersService } from "src/teachers/teachers.service";
import { User } from "src/users/entities/user.entity";
import { plainToInstance } from "class-transformer";
import { UUID } from "crypto";

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
          participations: createGradeDto.participations,
          exams: createGradeDto.exams,
          attendance: createGradeDto.attendance,
          practices: createGradeDto.practices,
          teacher_comments: createGradeDto.teacher_comments,
          internal_notes: createGradeDto.internal_notes,
          student,
          subject,
          teacher,
        });

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
      relations: {
        student: { user: true },
      },
    });
    const sanitizedGrades = plainToInstance(User, grades);
    return sanitizedGrades;
  }

  async findOne(uuid: UUID, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(Grade) : this.gradesRepository;

    const grade = await repo.findOne({ where: { uuid } });

    if (!grade)
      throw new NotFoundException(`Esta calificación no se encuentra.`);

    return grade;
  }

  async update(uuid: UUID, updateGradeDto: UpdateGradeDto) {
    return await this.dataSource.transaction(async (manager) => {
      try {
        const {
          teacher_comments,
          practices,
          participations,
          attendance,
          exams,
          internal_notes,
        } = updateGradeDto;

        const grade = await this.findOne(uuid, manager);

        grade.teacher_comments = teacher_comments;
        grade.internal_notes = internal_notes;
        grade.practices = practices ?? grade.practices;
        grade.participations = participations ?? grade.participations;
        grade.attendance = attendance ?? grade.attendance;
        grade.exams = exams ?? grade.exams;

        await this.dataSource.getRepository(Grade).save(grade);

        return grade;
      } catch (error) {
        if (error.code === "23505") {
          throw new ConflictException("Esta clase ya ha sido registrada.");
        }
        throw error;
      }
    });
  }

  async remove(uuid: UUID) {
    const grade = await this.findOne(uuid);
    return this.gradesRepository.delete({ id: grade.id });
  }
}
