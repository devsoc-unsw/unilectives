import config from "config";
import got from "got";
import { CirclesCourse } from "src/types/ICircles";
import { ICirclesConfig } from "src/types/IConfig";

export default class Fetcher {
  private readonly logger = console;

  async getCourses(): Promise<CirclesCourse[]> {
    try {
      const circles = config.get("circles") as ICirclesConfig;
      console.log(circles.url);
      const res = await got.get(`${circles.url}/courses/dump`);
      const courses = JSON.parse(res.body) as CirclesCourse[];

      return courses;
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }
}
