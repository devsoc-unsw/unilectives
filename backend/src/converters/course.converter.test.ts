import { getCourseEntity, getMockCourses } from "../utils/testData";
import {
  convertCourseEntityToInterface,
  convertCourseInterfaceToEntity,
} from "./course.converter";

describe("convertCourseEntityToInterface", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert CourseEntity to ICourse", () => {
    const course = getMockCourses()[0];
    const entity = getCourseEntity();
    expect(convertCourseEntityToInterface(entity)).toEqual(course);
  });
});

describe("convertCourseInterfaceToEntity", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert ICourse to CourseEntity", () => {
    const course = getMockCourses()[0];
    const entity = getCourseEntity();
    expect(convertCourseInterfaceToEntity(course)).toEqual(entity);
  });
});
