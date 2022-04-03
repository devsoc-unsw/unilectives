import { getUserEntity, getMockUser, getCourseEntity } from "../utils/testData";
import {
  convertUserEntityToInterface,
  convertUserInterfaceToEntity,
} from "./User.converter";

describe("convertUserEntityToInterface", () => {
  it("should convert UserEntity to IUser", () => {
    const course = getCourseEntity();
    const entity = getUserEntity();
    const user = getMockUser();
    expect(convertUserEntityToInterface(entity, [course])).toEqual(user);
  });
});

describe("convertUserInterfaceToEntity", () => {
  it("should convert IUser to UserEntity", () => {
    const entity = getUserEntity();
    const user = getMockUser();
    expect(convertUserInterfaceToEntity(user)).toEqual(entity);
  });
});
