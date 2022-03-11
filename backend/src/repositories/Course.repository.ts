import { CourseEntity } from "../entity/Course";
import { getRepository } from "typeorm";

export class CourseRepository {
  async getAllCourses(): Promise<CourseEntity[]> {
    return await getRepository(CourseEntity).find();
  }
}
