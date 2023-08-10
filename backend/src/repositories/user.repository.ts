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
      }
    });
    return rawUser;
  }

  async saveUser(user: CreateUser) {
    const rawUser = await this.prisma.users.upsert({
      where: {
        zid: user.zid,
      },
      update: user,
      create: user,
    });
    return rawUser;
  }

  async updateUser(user: {
    zid: string;
    bookmarkedReviews: string[]
  }) {
    const updatedUser = await this.prisma.users.update({
      where:{
        zid: user.zid,
      },
      data: {
        bookmarkedReviews: user.bookmarkedReviews,
      }
    })
    return updatedUser;
  }
}
