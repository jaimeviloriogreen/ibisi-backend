import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { UUID } from "crypto";
import { DataSource } from "typeorm";

@Controller("classes")
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll(
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 10,
  ) {
    return this.classesService.findAll(page, limit);
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.classesService.findOne(uuid);
  }

  @Patch(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: UUID,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(uuid, updateClassDto);
  }

  @Delete(":uuid")
  remove(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.classesService.remove(uuid);
  }

  @Delete(":classUUID/student/:studentUUID")
  removeStudent(
    @Param("classUUID", ParseUUIDPipe) classUUID: UUID,
    @Param("studentUUID", ParseUUIDPipe) studentUUID: UUID,
  ) {
    return this.classesService.removeStudent(classUUID, studentUUID);
  }
}
