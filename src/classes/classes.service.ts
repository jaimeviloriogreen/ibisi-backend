import { ConflictException, Injectable } from "@nestjs/common";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Class } from "./entities/class.entity";
import { DataSource, Repository } from "typeorm";
import { SubjectsService } from "src/subjects/subjects.service";
import { TeachersService } from "src/teachers/teachers.service";
import { StudentsService } from "src/students/students.service";
import { User } from "src/users/entities/user.entity";
import { plainToInstance } from "class-transformer";

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
    createClassDto.start_time = `${createClassDto.start_time}:00`;
    createClassDto.end_time = `${createClassDto.end_time}:00`;

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
          start_date: createClassDto.start_date,
          end_date: createClassDto.end_date,
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
  findOne(id: number) {
    return `This action returns a #${id} class`;
  }
  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }
  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
