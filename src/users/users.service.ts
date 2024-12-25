import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/shared.service';
import { RolesService } from 'src/roles/roles.service';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly sharedService: SharedService,
    private readonly roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = await this.sharedService.hashPassword(
      createUserDto.password,
    );
    const role = await this.roleService.findOne(createUserDto.role as UUID);
    createUserDto.password = password;

    const user = await this.usersRepository.save({ ...createUserDto, role });
    delete user.password;
    return user;
  }

  findAll() {
    return this.usersRepository.find({ relations: ['role'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
