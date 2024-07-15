import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../utils/logger";
import { IController } from "../interfaces/IController";
import { CourseService } from "../services/course.service";
import verifyToken from "../api/middlewares/auth";

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
        "/courses/all",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in GET /courses/all`);
          try {
            const allCourses = await this.courseService.getCourses();
            this.logger.info(`Responding to client in GET /courses/all`);
            return res.status(200).json(allCourses);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /courses/all ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
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
            const result =
              await this.courseService.getCoursesFromOffset(offset);
            this.logger.info(`Responding to client in GET /courses`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /courses ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/course/highest-rated/:term",
        async (
          req: Request<{ term: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(
            `Received request in GET /course/highest-rated/:term`,
          );
          try {
            const term: string = req.params.term;
            const result =
              await this.courseService.getHighestRatedCourseInTerm(term);
            this.logger.info(
              `Responding to client in GET /course/highest-rated/${term}`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /course/highest-rated ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/course/highest-attribute/:attribute",
        async (
          req: Request<{ attribute: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(
            `Received request in GET /course/highest-rated/:term`,
          );
          try {
            const attribute: string = req.params.attribute;
            const result =
              await this.courseService.getCourseWithHighestRatedAttribute(
                attribute,
              );
            this.logger.info(
              `Responding to client in GET /course/highest-attribute/${attribute}`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /course/highest-attribute ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/course/:courseCode",
        async (
          req: Request<{ courseCode: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received request in GET /course/:courseCode`);
          try {
            const courseCode: string = req.params.courseCode;
            const result = await this.courseService.getCourse(courseCode);
            this.logger.info(
              `Responding to client in GET /course/${courseCode}`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /course ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/course/search/:searchTerm",
        async (
          req: Request<{ searchTerm: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(
            `Received request in GET /course/search/:searchTerm`,
          );
          try {
            const searchTerm: string = req.params.searchTerm;
            const result = await this.courseService.searchCourse(searchTerm);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /course/search ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/course/filter/:terms/:faculties/:searchTerm",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in GET /course/filter`);
          try {
            const { terms, faculties, searchTerm } = req.params;

            const result = await this.courseService.filterCourse(
              terms,
              faculties,
              searchTerm,
            );

            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /course/filter ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .delete(
        "/cached/flush",
        async (
          req: Request<{ key: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received request in DELETE /cached/flush`);
          try {
            const zid = req.headers.zid as string;
            const result = await this.courseService.flushAll(zid);
            this.logger.info(`Responding to client in DELETE /cached/flush`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE /cached/flush ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .delete(
        "/cached/:key",
        async (
          req: Request<{ key: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received request in DELETE /cached/:key`);
          try {
            const key: string = req.params.key;
            const zid = req.headers.zid as string;
            const result = await this.courseService.flushKey(zid, key);
            this.logger.info(`Responding to client in DELETE /cached/${key}`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE /cached/:key ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
