import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { UUID } from "crypto";
import { Role } from "src/roles/decorators/role.decorator";
import { RolesEnum } from "src/roles/enums/role.enum";

@Role(RolesEnum.ADMIN)
@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return await this.studentsService.findAll();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.studentsService.findOne(uuid);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.studentsService.remove(+id);
  }
}
