import { PrismaClient } from "@prisma/client";
import { CreateUser, User, UserSchema } from "../api/schemas/user.schema";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

<<<<<<< HEAD
  async getUser(zid: string) {
=======
  async getUser(zid: string): Promise<User | null> {
>>>>>>> 47351ea6dd65e716eb4312736b591bbd835b6d08
    const rawUser = await this.prisma.users.findFirst({
      where: {
        zid: zid,
      },
    });
<<<<<<< HEAD
    // const user = UserSchema.parse(rawUser);
    return rawUser;
=======
    const user = UserSchema.parse(rawUser);
    return user;
>>>>>>> 47351ea6dd65e716eb4312736b591bbd835b6d08
  }

  async saveUser(user: CreateUser): Promise<User> {
    const rawUser = await this.prisma.users.upsert({
      where: {
        zid: user.zid,
      },
      update: user,
      create: user,
    });
<<<<<<< HEAD
    // const savedUser = UserSchema.parse(rawUser);
    return rawUser;
=======
    const savedUser = UserSchema.parse(rawUser);
    return savedUser;
>>>>>>> 47351ea6dd65e716eb4312736b591bbd835b6d08
  }
}
