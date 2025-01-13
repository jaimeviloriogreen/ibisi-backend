import { Grade } from "src/grades/entities/grade.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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
}
