import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { unique: true })
  @Generated('uuid')
  uuid: string;

  @Column('varchar', { nullable: false, length: 100 })
  fname: string;

  @Column('varchar', { nullable: false, length: 100 })
  lname: string;

  @Column('char', { nullable: false, unique: true, length: 11 })
  identification: string;

  @Column('bytea', { nullable: false })
  password: string;

  @Column('char', { array: true, nullable: true, length: 10 })
  phones: string[];

  @Column('enum', {
    nullable: false,
    default: 'M',
    enum: Gender,
  })
  gender: Gender;

  @Column('varchar', { nullable: true, length: 150 })
  adddress: string;

  @Column('varchar', { unique: true, nullable: true, length: 100 })
  email: string;

  @Column('boolean', { nullable: false, default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
