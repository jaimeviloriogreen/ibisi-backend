import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  StudentAccountStatus,
  StudentLevel,
  StudentStatus,
} from "../enums/student.enums";
import { User } from "src/users/entities/user.entity";
import { Grade } from "src/grades/entities/grade.entity";
import { Class } from "src/classes/entities/class.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @Column("enum", { enum: StudentLevel, default: StudentLevel.FIRST })
  level: string;

  @Column("date")
  registration_date: Date;

  @Column("enum", {
    enum: StudentAccountStatus,
    default: StudentAccountStatus.PAID,
  })
  account_status: string;

  @Column("enum", { enum: StudentStatus, default: StudentStatus.ENROLLED })
  status: string;

  @Column("boolean", { default: false })
  scholarship: boolean;

  @OneToOne(() => User, (user) => user.student, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => Grade, (grade) => grade.student)
  grade: Grade[];

  @ManyToMany(() => Class, (classes) => classes.students)
  @JoinTable({
    name: "students_classes",
  })
  classes: Class[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
