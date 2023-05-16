import { getUserEntity, getMockUser, getCourseEntity } from "../utils/testData";
import { convertUserEntityToInterface } from "./user.converter";

describe("convertUserEntityToInterface", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert UserEntity to IUser", () => {
    const course = getCourseEntity();
    const entity = getUserEntity();
    const user = getMockUser();
    expect(convertUserEntityToInterface(entity, [course])).toEqual(user);
  });
});
