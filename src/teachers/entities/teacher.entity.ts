import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
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

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn()
  user: User;
}
