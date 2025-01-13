import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { EntityManager, Repository } from "typeorm";
import { Subject } from "./entities/subject.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjecsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto, manager?: EntityManager) {
    try {
      const repo = manager
        ? manager.getRepository(Subject)
        : this.subjecsRepository;

      return await repo.save(createSubjectDto);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Esta asignatura ya ha sido registrada.");
      }
      throw error;
    }
  }

  findAll() {
    return this.subjecsRepository.find();
  }

  async findOne(uuid: UUID, manager?: EntityManager) {
    const repo = manager
      ? manager.getRepository(Subject)
      : this.subjecsRepository;

    const subject = await repo.findOne({ where: { uuid } });

    if (!subject)
      throw new NotFoundException(`Esta asignatura no se encuentra.`);
    return subject;
  }

  async update(uuid: UUID, updateSubjectDto: UpdateSubjectDto) {
    try {
      const subject = await this.findOne(uuid);
      return await this.subjecsRepository.update(subject.id, updateSubjectDto);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Esta asignatura ya ha sido registrada.");
      }
      throw error;
    }
  }

  async remove(uuid: UUID) {
    const subject = await this.findOne(uuid);
    return await this.subjecsRepository.delete(subject.id);
  }
}
