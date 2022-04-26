import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./User";

// TODO: UPDATE PLACEHOLDER
@Entity({ name: "reviews", schema: "cselectives" })
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid", { name: "review_id" })
  reviewId: string;

  @ManyToOne(() => UserEntity, (user) => user.zid)
  @JoinColumn({ name: "zid" })
  zid: string;

  @Column("text", { name: "author_name", nullable: false })
  authorName: string;

  @Column("text", { name: "description", nullable: false })
  description: string;
}
