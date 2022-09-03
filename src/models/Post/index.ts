import { User } from "./../User/index";
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { Music } from "../Music";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  media: string;

  @ManyToOne(() => Music)
  music: Music;

  @ManyToOne(() => User)
  author: User;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    nullable: true,
    name: "updated_at",
  })
  updatedAt: Date;
}
