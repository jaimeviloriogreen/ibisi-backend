import { GoneException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SharedService } from "src/shared/shared.service";
import { RolesService } from "src/roles/roles.service";
import { UUID } from "crypto";
import { plainToInstance } from "class-transformer";

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
  async findAll() {
    const users = await this.usersRepository.find({
      relations: { student: true, role: true },
    });
    const sanitizedUsers = plainToInstance(User, users);

    return sanitizedUsers;
  }
  async findOne(uuid: UUID) {
    const user = await this.usersRepository.findOne({
      where: { uuid },
      relations: { role: true },
    });

    if (!user) throw new NotFoundException(`User with id ${uuid} is not found`);

    if (!user.isActive)
      throw new GoneException(
        "This account has been deleted or inactive and is no longer accessible.",
      );
    delete user.password;
    return user;
  }
  async findOneByIdentification(identification: string) {
    const user = await this.usersRepository.findOne({
      where: { identification },
      relations: { role: true },
    });

    if (!user)
      throw new NotFoundException(
        `User with identification ${identification} is not found`,
      );

    if (!user.isActive)
      throw new GoneException(
        "This account has been deleted or inactive and is no longer accessible.",
      );

    return user;
  }
}
