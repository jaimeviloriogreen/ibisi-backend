import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Class } from "./entities/class.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { SubjectsService } from "src/subjects/subjects.service";
import { TeachersService } from "src/teachers/teachers.service";
import { StudentsService } from "src/students/students.service";
import { User } from "src/users/entities/user.entity";
import { plainToInstance } from "class-transformer";
import { UUID } from "crypto";

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    private readonly dataSource: DataSource,
    private readonly subjectsServise: SubjectsService,
    private readonly teachersServise: TeachersService,
    private readonly studentsServise: StudentsService,
  ) {}
  async create(createClassDto: CreateClassDto) {
    return await this.dataSource.transaction(async (manager) => {
      try {
        const subject = await this.subjectsServise.findOne(
          createClassDto.subjectId,
          manager,
        );

        const teacher = await this.teachersServise.findOne(
          createClassDto.teacherId,
          manager,
        );

        const students = await Promise.all(
          createClassDto.studentsId.map(async (uuid) => {
            return await this.studentsServise.findOne(uuid, manager);
          }),
        );

        const classCreated = this.dataSource.getRepository(Class).create({
          start_date: createClassDto.start_date.split("T")[0],
          end_date: createClassDto.end_date.split("T")[0],
          start_time: createClassDto.start_time,
          end_time: createClassDto.end_time,
          section: createClassDto.section,
          day: createClassDto.day,
          subject,
          teacher,
          students,
        });

        return await manager.getRepository(Class).save(classCreated);
      } catch (error) {
        if (error.code === "23505") {
          throw new ConflictException("Esta clase ya ha sido registrada.");
        }
        throw error;
      }
    });
  }
  async countClasses() {
    return await this.classesRepository.count({
      where: { is_active: true },
    });
  }
  async findAll() {
    const classes = await this.classesRepository.find({
      relations: {
        subject: true,
        teacher: {
          user: true,
        },
        students: {
          user: true,
        },
      },
    });

    const classesSanitized = plainToInstance(User, classes);

    return classesSanitized;
  }
  async findOne(uuid: UUID, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(Class)
      : this.classesRepository;

    const getClass = await repo.findOne({
      where: { uuid },
      relations: {
        subject: true,
        teacher: {
          user: true,
        },
        students: {
          user: true,
          grade: {
            subject: true,
          },
        },
      },
    });

    if (!getClass) throw new NotFoundException(`Esta clase no se encuentra.`);

    // Filter grades that only apply to the subject of this class
    if (getClass) {
      getClass.students = getClass.students.map((student) => {
        student.grade = student.grade.filter(
          (grade) => grade.subject.id === getClass.subject.id,
        );
        return student;
      });
    }

    // TODO: Sanear la contreaseña de los usuarios en getClass

    return getClass;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }
  remove(uuid: UUID) {
    return `This action removes a #${uuid} class`;
  }

  async removeStudent(classUUID: UUID, studentUUID: UUID) {
    return await this.dataSource.transaction(async (manager) => {
      const getStudent = await this.studentsServise.findOne(
        studentUUID,
        manager,
      );
      const getClass = await this.findOne(classUUID, manager);

      getClass.students = getClass.students.filter((student) => {
        return student.id !== getStudent.id;
      });

      return await manager.getRepository(Class).save(getClass);
    });
  }
}
