import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Role } from "src/roles/decorators/role.decorator";
import { RolesEnum } from "src/roles/enums/role.enum";

@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Role(RolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gradesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gradesService.remove(+id);
  }
}
