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
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @OneToOne(() => User, (user) => user.admin, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
