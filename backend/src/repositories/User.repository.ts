import { UserEntity } from "../entity/User";
import { getRepository } from "typeorm";

export class UserRepository {
  async getUser(zid: string): Promise<UserEntity | undefined> {
    return await getRepository(UserEntity).findOne({ zid });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return await getRepository(UserEntity).save(user);
  }
}