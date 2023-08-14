import { PrismaClient } from "@prisma/client";
import { CreateUser, User, UserSchema } from "../api/schemas/user.schema";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async getUser(zid: string) {
    const rawUser = await this.prisma.users.findFirst({
      where: {
        zid: zid,
      },
      include: {
        reports: true,
        reviews: true
      }
    });
    return rawUser;
  }

  async saveUser(user: CreateUser): Promise<User> {
    // const rawUser = await this.prisma.users.upsert({
    //   where: {
    //     zid: user.zid,
    //   },
    //   update: user,
    //   create: user,
    // });
    // const savedUser = UserSchema.parse(rawUser);
    // return savedUser;
    return UserSchema.parse(user);
  }
}
