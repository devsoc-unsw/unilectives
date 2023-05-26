import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../utils/logger";
import { IController } from "../interfaces/IController";
import { CourseService } from "../services/course.service";
import {
  BookmarkCourseSchema,
  UpdateCourseSchema,
  CourseBody,
  BookmarkCourse,
} from "../api/schemas/course.schema";
import validationMiddleware from "../api/middlewares/validation";
import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";

export class CourseController implements IController {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly courseService: CourseService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/courses",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in GET /courses`);
          try {
            const offsetStr = req.query.offset as string;
            let offset = 0;
            if (offsetStr !== undefined) {
              offset = parseInt(offsetStr);
            }
            const result = await this.courseService.getCoursesFromOffset(
              offset
            );
            this.logger.info(`Responding to client in GET /courses`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /courses ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/courses/:courseCode",
        validationMiddleware(UpdateCourseSchema, "body"),
        async (
          req: Request<{ courseCode: string }, unknown, CourseBody>,
          res: Response,
          next: NextFunction
        ) => {
          const { courseCode } = req.params;
          this.logger.debug(`Received request in PUT /courses/${courseCode}`);
          try {
            const { course } = req.body;
            if (courseCode !== course.courseCode)
              throw new HTTPError(badRequest);
            const result = await this.courseService.updateCourse(course);
            this.logger.info(
              `Responding to client in PUT /courses/${courseCode}`
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to PUT /courses/${courseCode} ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/courses/bookmark",
        validationMiddleware(BookmarkCourseSchema, "body"),
        async (
          req: Request<Record<string, never>, unknown, BookmarkCourse>,
          res: Response,
          next: NextFunction
        ) => {
          this.logger.debug(`Received request in POST /courses/bookmark`);
          try {
            const bookmarkDetails = req.body;
            if (!bookmarkDetails) throw new HTTPError(badRequest);
            const result = await this.courseService.bookmarkCourse(
              bookmarkDetails
            );
            this.logger.info(`Responding to client in POST /courses/bookmark`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /courses/bookmark ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/course/page/:courseCode",
        async (
          req: Request<{ courseCode: string }, unknown>,
          res: Response,
          next: NextFunction
        ) => {
          this.logger.debug(`Received request in GET /course/page/:courseCode`);
          try {
            const courseCode: string = req.params.courseCode;
            const result = await this.courseService.getCourse(courseCode);
            this.logger.info(
              `Responding to client in GET /course/page/${courseCode}`
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /course/page ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
