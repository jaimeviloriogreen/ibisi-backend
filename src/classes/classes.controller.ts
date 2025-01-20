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
import { ClassesService } from "./classes.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { UUID } from "crypto";

@Controller("classes")
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.classesService.findOne(uuid);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
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
