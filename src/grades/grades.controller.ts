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
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Role } from "src/roles/decorators/role.decorator";
import { RolesEnum } from "src/roles/enums/role.enum";
import { UUID } from "crypto";

@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Role(RolesEnum.ADMIN, RolesEnum.TEACHER)
  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Role(RolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.gradesService.findOne(uuid);
  }

  @Role(RolesEnum.ADMIN, RolesEnum.TEACHER)
  @Patch(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: UUID,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return this.gradesService.update(uuid, updateGradeDto);
  }

  @Role(RolesEnum.ADMIN, RolesEnum.TEACHER)
  @Delete(":uuid")
  remove(@Param("uuid") uuid: UUID) {
    return this.gradesService.remove(uuid);
  }
}
