import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
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
  acount_status: string;

  @Column("enum", { enum: StudentStatus, default: StudentStatus.ENROLLED })
  status: string;

  @Column("boolean", { default: false })
  scholarship: boolean;

  @OneToOne(() => User, (user) => user.student, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
