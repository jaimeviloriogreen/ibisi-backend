import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/entities/user.entity";

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
      relations: { user: true },
    });
    const sanitizedStudents = plainToInstance(User, students);

    return sanitizedStudents;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
