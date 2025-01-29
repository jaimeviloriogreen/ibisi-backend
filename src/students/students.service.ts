import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { UUID } from "crypto";
import { StudentStatus } from "./enums/student.enums";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studetsRepository: Repository<Student>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    return "This action adds a new student";
  }

  async findAll() {
    const students = await this.studetsRepository.find({
      where: [{ user: { isActive: true }, status: StudentStatus.ENROLLED }],
      relations: { user: true },
      order: { user: { fname: "ASC" } },
    });
    const sanitizedStudents = plainToInstance(User, students);

    return sanitizedStudents;
  }

  async countStudents() {
    return await this.studetsRepository.count();
  }

  async findOne(uuid: UUID, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(Student)
      : this.studetsRepository;

    const student = await repo.findOne({
      where: { uuid },
      relations: { user: true },
    });

    if (!student)
      throw new NotFoundException(`Este estudiante no se encuentra.`);

    delete student.user.password;
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
