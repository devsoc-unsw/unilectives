import { CourseEntity } from "../entity/Course";
import { getRepository } from "typeorm";

export class CourseRepository {
  async getCourse(courseCode: string): Promise<CourseEntity | undefined> {
    return await getRepository(CourseEntity).findOne({ courseCode });
  }

  async getAllCourses(): Promise<CourseEntity[]> {
    return await getRepository(CourseEntity).find();
  }

  async save(course: CourseEntity): Promise<CourseEntity> {
    return await getRepository(CourseEntity).save(course);
  }
}
