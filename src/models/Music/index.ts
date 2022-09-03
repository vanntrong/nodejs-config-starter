import {
  BaseEntity,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { Post } from "../Post";

@Entity()
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  song: string;

  @OneToMany(() => Post, (post) => post)
  posts: Post[];

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
