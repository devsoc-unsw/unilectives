import { UserEntity } from "../entity/User";
import { EntityManager } from "typeorm";

export class UserRepository {
  constructor(private readonly manager: EntityManager) {}
  async getUser(zid: string): Promise<UserEntity | null> {
    return await this.manager.findOne(UserEntity, {
      relations: ["reports", "reviews"],
      where: { zid },
    });
  }

  async saveUser(user: UserEntity): Promise<UserEntity | null> {
    return await this.manager.save(UserEntity, user);
  }
}
