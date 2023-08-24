import { PrismaClient } from "@prisma/client";
import { CreateUser, User, UserSchema } from "../api/schemas/user.schema";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUser(zid: string) {
    const rawUser = await this.prisma.users.findFirst({
      where: {
        zid: zid,
      },
      include: {
        reports: true,
        reviews: true,
      },
    });
    return rawUser;
  }

  async saveUser(user: CreateUser) {
    const rawUser = await this.prisma.users.create({
      data: {
        zid: user.zid,
        isAdmin: user.isAdmin,
      },
    });
    return rawUser;
  }

  async updateUser(user: { zid: string; bookmarkedReviews: string[] }) {
    const updatedUser = await this.prisma.users.update({
      where: {
        zid: user.zid,
      },
      data: {
        bookmarkedReviews: user.bookmarkedReviews,
      },
    });
    return updatedUser;
  }

  async getUserCourseInfo(courseCode: string, zid: string) {
    const userInfo = await this.prisma.users.findFirst({
      where: {
        zid: zid,
      },
      select: {
        bookmarkedReviews: true,
      },
    });

    if (!userInfo) {
      throw new Error("No user info found");
    }

    const courseBookmarks = await this.prisma.reviews.findMany({
      where: {
        courseCode,
        reviewId: {
          in: userInfo.bookmarkedReviews,
        },
      },
      select: {
        reviewId: true,
      },
    });

    return courseBookmarks;
  }
}
