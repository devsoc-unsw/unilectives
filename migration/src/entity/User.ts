import { PrimaryColumn, Column, Entity, OneToMany } from "typeorm";
import { ReviewEntity } from "./Review";

@Entity({ name: "users", schema: "cselectives" })
export class UserEntity {
  @PrimaryColumn("text", { name: "zid" })
  zid: string;

  @OneToMany(() => ReviewEntity, (review) => review.zid, {
    eager: true,
    cascade: true,
  })
  reviews: ReviewEntity[];

  @Column("uuid", {
    array: true,
    name: "bookmarked_reviews",
    nullable: false,
    default: () => "array[]::uuid[]",
  })
  bookmarkedReviews: string[];

  @Column("text", {
    array: true,
    name: "bookmarked_courses",
    nullable: false,
    default: () => "array[]::text[]",
  })
  bookmarkedCourses: string[];

  @Column("boolean", { name: "is_admin", nullable: false })
  isAdmin: boolean;
}
