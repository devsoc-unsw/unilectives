import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReportStatus } from "../interfaces/IReport";
import { ReviewEntity } from "./Review";
import { UserEntity } from "./User";

@Entity({ name: "reports", schema: "cselectives" })
export class ReportEntity {
  @PrimaryGeneratedColumn("uuid", { name: "report_id" })
  reportId: string;

  @ManyToOne(() => ReviewEntity, (review) => review.reviewId, { eager: true })
  @JoinColumn({ name: "review_id" })
  review: ReviewEntity;

  @ManyToOne(() => UserEntity, (user) => user.zid)
  @JoinColumn({ name: "zid" })
  zid: string;

  @Column("enum", {
    name: "status",
    nullable: false,
    enum: ["UNSEEN", "SEEN", "REMOVED", "SETTLED"],
    default: "UNSEEN",
  })
  status: ReportStatus;

  @Column("text", { name: "reason", nullable: false })
  reason: string;
}
