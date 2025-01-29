import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto, UpdateUserPasswordDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SharedService } from "src/shared/shared.service";
import { RolesService } from "src/roles/roles.service";
import { UUID } from "crypto";
import { plainToInstance } from "class-transformer";

import { RolesEnum } from "src/roles/enums/role.enum";
import { Admin } from "src/admin/entities/admin.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Student } from "src/students/entities/student.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly sharedService: SharedService,
    private readonly roleService: RolesService,

    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        // TODO: make manager context
        const password = await this.sharedService.hashPassword(
          createUserDto.password,
        );
        const role = await this.roleService.findOneByName(createUserDto.role);

        const createUser = this.usersRepository.create({
          fname: createUserDto.fname,
          lname: createUserDto.lname,
          identification: createUserDto.identification,
          password,
          phones: createUserDto.phones,
          gender: createUserDto.gender,
          address: createUserDto.address,
          email: createUserDto.email,
          isActive: createUserDto.isActive,
          role,
        });

        const userSaved = await manager.save(User, createUser);

        if (role.name === RolesEnum.ADMIN) {
          const admin = new Admin();
          admin.user = userSaved;
          await manager.save(Admin, admin);
        }

        if (role.name === RolesEnum.TEACHER) {
          const teacher = new Teacher();
          teacher.user = userSaved;
          await manager.save(Teacher, teacher);
        }

        if (role.name === RolesEnum.STUDENT) {
          if (!createUserDto.student) {
            throw new BadRequestException(
              "Debe ingresar los datos del estudiante",
            );
          }

          const student = new Student();
          student.level = createUserDto.student.level;
          student.registration_date = createUserDto.student.registration_date;
          student.acount_status = createUserDto.student.acount_status;
          student.status = createUserDto.student.status;
          student.scholarship = createUserDto.student.scholarship;
          student.user = userSaved;
          await manager.save(Student, student);
        }

        return userSaved;
      });
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException(
          "La cédula o el correo del usuario ya están en uso.",
        );
      }
      throw error;
    }
  }
  async findAll() {
    const users = await this.usersRepository.find({
      relations: { student: true, role: true, teacher: true, admin: true },
      order: { fname: "ASC" },
    });

    return plainToInstance(User, users);
  }
  async findOne(uuid: UUID, sanitized: boolean = true) {
    const user = await this.usersRepository.findOne({
      where: { uuid },
      relations: {
        role: true,
        student: {
          grade: { subject: true, teacher: { user: true } }, // student: true
          classes: {
            subject: true,
            teacher: { user: true },
          },
        },
        teacher: {
          classes: {
            subject: true,
            students: true,
          },
        },
        admin: true,
      },
    });

    if (!user) throw new NotFoundException(`El usuario no se encuentra.`);

    if (!user.isActive)
      throw new GoneException(
        "Esta cuenta está eliminada o inactiva y ya no está disponible.",
      );

    const sanitizedUser = sanitized ? plainToInstance(User, user) : user;

    return sanitizedUser;
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

  async updateOneProfile(uuid: UUID, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(uuid);

      user.fname = updateUserDto.fname;
      user.lname = updateUserDto.lname;
      user.identification = updateUserDto.identification;
      user.email = updateUserDto.email;
      user.phones = updateUserDto.phones;
      user.address = updateUserDto.address;

      await this.usersRepository.save(user);

      delete user.password;

      return user;
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException(
          "La cédula o el correo del usuario ya están en uso.",
        );
      }
      throw error;
    }
  }

  async updateOnePassword(
    uuid: UUID,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const user = await this.findOne(uuid, false);

    const passwordValidated = await this.sharedService.verifyPassword(
      updateUserPasswordDto.oldPassword,
      user.password.toString(),
    );
    if (!passwordValidated)
      throw new UnauthorizedException(`Contraseña inválida`);

    user.password = await this.sharedService.hashPassword(
      updateUserPasswordDto.password,
    );

    await this.usersRepository.save(user);

    return plainToInstance(User, user);
  }
}

// if (error.code === "23505") {
//   throw new BadRequestException("This category already exists");
// }
