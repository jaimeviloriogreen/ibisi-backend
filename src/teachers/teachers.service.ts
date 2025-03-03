import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { EntityManager, Repository } from "typeorm";
import { Teacher } from "./entities/teacher.entity";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";

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
      order: { user: { fname: "ASC" } },
    });
    const sanitizedTeachers = plainToInstance(User, teachers);
    return sanitizedTeachers;
  }

  async findOne(uuid: UUID, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(Teacher)
      : this.teachersRepository;

    const teacher = await repo.findOne({
      where: { uuid },
      relations: { user: true },
    });

    if (!teacher) throw new NotFoundException(`Este profesor no se encuentra.`);
    delete teacher.user.password;
    return teacher;
  }

  async countTeachers() {
    return await this.teachersRepository.count();
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
