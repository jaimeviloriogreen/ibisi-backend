import { Student } from "src/students/entities/student.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { ClassesDay, ClassesSections } from "../enums/classes.enums";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Subject } from "src/subjects/entities/subject.entity";

@Unique(["teacher", "subject", "day"])
@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @Column("date")
  start_date: Date;

  @Column("date")
  end_date: Date;

  @Column("time")
  start_time: Date;

  @Column("time")
  end_time: Date;

  @Column("enum", {
    enum: ClassesSections,
    default: ClassesSections.NIGHT_CLASSES,
  })
  section: string;

  @Column("enum", {
    enum: ClassesDay,
  })
  day: string;

  @Column("boolean", { default: true })
  is_active: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.classes)
  subject: Subject;

  @ManyToMany(() => Student, (student) => student.classes, {
    onDelete: "CASCADE",
  })
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
