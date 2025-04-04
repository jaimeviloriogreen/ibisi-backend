import { Role } from "src/roles/entities/role.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Gender } from "../enums/user.enums";
import { Exclude } from "class-transformer";
import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Admin } from "src/admin/entities/admin.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @Column("varchar", { nullable: false, length: 100 })
  fname: string;

  @Column("varchar", { nullable: false, length: 100 })
  lname: string;

  @Column("char", { nullable: false, unique: true, length: 11 })
  identification: string;

  @Column("bytea", { nullable: false })
  @Exclude()
  password: string;

  @Column("char", { array: true, nullable: true, length: 10 })
  phones: string[];

  @Column("enum", {
    nullable: false,
    default: "M",
    enum: Gender,
  })
  gender: Gender;

  @Column("varchar", {
    nullable: true,
    length: 150,
    transformer: {
      to: (value: string | null) => (value === "" ? null : value),
      from: (value: string | null) => (value === "" ? null : value),
    },
  })
  address: string;

  @Column("varchar", {
    unique: true,
    nullable: true,
    length: 100,
    transformer: {
      to: (value: string | null) => (value === "" ? null : value),
      from: (value: string | null) => (value === "" ? null : value),
    },
  })
  email: string;

  @Column("boolean", { nullable: false, default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => Student, (student) => student.user)
  student: Student | null;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher | null;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
