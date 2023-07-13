import { PrismaClient } from "@prisma/client";
import { CreateUser, User, UserSchema } from "../api/schemas/user.schema";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUser(zid: string): Promise<User | null> {
    const rawUser = await this.prisma.users.findFirst({
      where: {
        zid: zid,
      },
    });
    const user = UserSchema.parse(rawUser);
    return user;
  }

  async saveUser(user: CreateUser): Promise<User> {
    const rawUser = await this.prisma.users.upsert({
      where: {
        zid: user.zid,
      },
      update: user,
      create: user,
    });
    const savedUser = UserSchema.parse(rawUser);
    return savedUser;
  }
}
