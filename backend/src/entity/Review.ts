import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReportEntity } from "./Report";
import { UserEntity } from "./User";

// TODO: UPDATE PLACEHOLDER
@Entity({ name: "reviews", schema: "cselectives" })
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid", { name: "review_id" })
  reviewId: string;

  @ManyToOne(() => UserEntity, (user) => user.zid)
  @JoinColumn({ name: "zid" })
  zid: string;

  @OneToMany(() => ReportEntity, (report) => report.zid, {
    eager: true,
    cascade: true,
  })
  public reports: ReportEntity[];
}
