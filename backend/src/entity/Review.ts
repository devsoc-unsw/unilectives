import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity({ name: "reviews", schema: "cselectives" })
export class ReviewEntity {
  @PrimaryColumn("uuid", { name: "review_id" })
  reviewId: string;

  @Column("text", { name: "zid", nullable: false })
  zid: string;

  @Column("text", { name: "course_code", nullable: false })
  courseCode: string;

  @Column("text", { name: "author_name", nullable: false })
  authorName: string;

  @Column("text", { name: "description", nullable: true })
  description: string;

  @Column("integer", { name: "grade", nullable: false })
  grade: number;

  @Column("text", { name: "term_taken", nullable: false })
  termTaken: string;

  @Column("timestamp", { name: "created_timestamp", nullable: false })
  createdTimestamp: Date;

  @Column("timestamp", { name: "updated_timestamp", nullable: false })
  updatedTimestamp: Date;

  @Column("text", { array: true, name: "upvotes", nullable: false })
  upvotes: string[];

}