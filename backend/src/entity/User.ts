import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity({ name: "users", schema: "cselectives" })
export class UserEntity {
  @PrimaryColumn("text", { name: "zid" })
  zid: string;

  @Column("text", { array: true, name: "bookmarked_reviews", nullable: false })
  bookmarkedReviews: string[];

  @Column("text", { array: true, name: "bookmarked_courses", nullable: false })
  bookmarkedCourses: string[];

  @Column("boolean", { name: "is_admin", nullable: false })
  isAdmin: boolean;
}
