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
import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { UUID } from "crypto";

@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: UUID) {
    return this.subjectsService.findOne(uuid);
  }

  @Patch(":uuid")
  update(
    @Param("uuid") uuid: UUID,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(uuid, updateSubjectDto);
  }

  @Delete(":uuid")
  remove(@Param("uuid") uuid: UUID) {
    return this.subjectsService.remove(uuid);
  }
}
