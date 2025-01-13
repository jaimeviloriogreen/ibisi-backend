import { Student } from "src/students/entities/student.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique(["student", "subject"])
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @Check("final_grade > 0 AND final_grade <= 100")
  @Column("smallint")
  final_grade: number;

  @Column("varchar", { nullable: true })
  teacher_comments: string;

  @Column("varchar", { nullable: true })
  internal_notes: string;

  @ManyToOne(() => Student, (student) => student.grade)
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.grade)
  subject: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.grade, {
    nullable: true,
    onDelete: "SET NULL",
  })
  teacher: Teacher;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
