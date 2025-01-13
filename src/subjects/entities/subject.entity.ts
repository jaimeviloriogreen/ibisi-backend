import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { unique: true })
  @Generated("uuid")
  uuid: string;

  @Column({ type: "varchar", unique: true, length: 50 })
  name: string;

  @Column({ type: "varchar", unique: true, length: 15 })
  code: string;

  @Column({ type: "varchar", length: 15 })
  period: string;

  @Column({ type: "smallint" })
  credits: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
