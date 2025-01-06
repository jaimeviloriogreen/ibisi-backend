import { Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Repository } from "typeorm";
import { Teacher } from "./entities/teacher.entity";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}
  create(createTeacherDto: CreateTeacherDto) {
    return "This action adds a new teacher";
  }

  async findAll() {
    const teachers = await this.teachersRepository.find({
      relations: { user: true },
    });
    const sanitizedTeachers = plainToInstance(User, teachers);
    return sanitizedTeachers;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
