import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { StudentsService } from "src/students/students.service";
import { TeachersService } from "src/teachers/teachers.service";
import { ClassesService } from "src/classes/classes.service";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
    private readonly classesService: ClassesService,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return "This action adds a new admin";
  }

  async getGeneralResume() {
    const totalStudents = await this.studentsService.countStudents();
    const totalTeachers = await this.teachersService.countTeachers();
    const totalActiveClasses = await this.classesService.countClasses();

    return { totalStudents, totalTeachers, totalActiveClasses };
  }

  async findAll() {
    const admins = await this.adminsRepository.find({
      relations: { user: true },
    });

    const sanitizedAdmins = plainToInstance(User, admins);

    return sanitizedAdmins;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
