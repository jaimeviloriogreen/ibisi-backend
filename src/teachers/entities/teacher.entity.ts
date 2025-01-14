import { Class } from "src/classes/entities/class.entity";
import { Grade } from "src/grades/entities/grade.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @OneToMany(() => Grade, (grade) => grade.teacher)
  grade: Grade[];

  @OneToOne(() => User, (user) => user.teacher, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => Class, (classes) => classes.teacher)
  classes: Class[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
