import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { User } from "../User";

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({
    default: false,
    name: "is_read",
  })
  isRead: boolean;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

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
