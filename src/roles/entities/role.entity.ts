import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RolesEnum, RolesPermissions } from "../enums/role.enum";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @Column({
    type: "enum",
    enum: RolesEnum,
    default: RolesEnum.STUDENT,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: "simple-array",
    nullable: false,
  })
  permissions: RolesPermissions[];

  @OneToMany(() => User, (user) => user.role)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
