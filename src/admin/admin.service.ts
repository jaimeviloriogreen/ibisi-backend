import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return "This action adds a new admin";
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
