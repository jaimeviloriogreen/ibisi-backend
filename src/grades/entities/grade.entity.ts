import { GRADE_PECENTAGE } from "src/configs/constants";
import { Student } from "src/students/entities/student.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import {
  BeforeInsert,
  BeforeUpdate,
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

  @Check("practices >= 0 AND practices <= 100")
  @Column("smallint")
  practices: number;

  @Check("participations >= 0 AND participations <= 100")
  @Column("smallint")
  participations: number;

  @Check("attendance >= 0 AND attendance <= 100")
  @Column("smallint")
  attendance: number;

  @Check("exams >= 0 AND exams <= 100")
  @Column("smallint")
  exams: number;

  @Check("final_grade >= 0 AND final_grade <= 100")
  @Column("smallint")
  final_grade: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateFinalGrade() {
    const practices = this.practices * GRADE_PECENTAGE.practices;
    const participations = this.participations * GRADE_PECENTAGE.participations;
    const attendance = this.attendance * GRADE_PECENTAGE.attendance;
    const exams = this.exams * GRADE_PECENTAGE.exams;

    this.final_grade = Math.round(
      practices + participations + attendance + exams,
    );
  }

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
