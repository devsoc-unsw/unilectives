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
    return (
      Router()
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
        .get(
          "/course/:courseCode",
          async (
            req: Request<{ courseCode: string }, unknown>,
            res: Response,
            next: NextFunction
          ) => {
            this.logger.debug(`Received request in GET /course/:courseCode`);
            try {
              const courseCode: string = req.params.courseCode;
              const result = await this.courseService.getCourse(courseCode);
              this.logger.info(
                `Responding to client in GET /course/${courseCode}`
              );
              return res.status(200).json(result);
            } catch (err: any) {
              this.logger.warn(
                `An error occurred when trying to GET /course ${formatError(
                  err
                )}`
              );
              return next(err);
            }
          }
        )
        // .get(
        //   "/course/search/:searchTerm",
        //   async (
        //     req: Request<{ searchTerm: string }, unknown>,
        //     res: Response,
        //     next: NextFunction
        //   ) => {
        //     this.logger.debug(
        //       `Received request in GET /course/search/:searchTerm`
        //     );
        //     try {
        //       const searchTerm: string = req.params.searchTerm;
        //       const result = await this.courseService.searchCourse(searchTerm);
        //       return res.status(200).json(result);
        //     } catch (err: any) {
        //       this.logger.warn(
        //         `An error occurred when trying to GET /course/search ${formatError(
        //           err
        //         )}`
        //       );
        //       return next(err);
        //     }
        //   }
        // )
        .get(
          "/course/filter/:terms/:faculties/:searchTerm",
          async (req: Request, res: Response, next: NextFunction) => {
            this.logger.debug(`Received request in GET /course/filter`);
            try {
              // console.log(req.query);
              console.log("called");
              // const terms = req.params.terms.split('&');
              // const { options } = req.params;
              console.log("req", req.params);
              // console.log('terms', terms);
              const { terms, faculties, searchTerm } = req.params;
              const result = await this.courseService.filterCourse(
                terms,
                faculties,
                searchTerm
              );
              //console.log("res:", result?.courses.slice(0, 3));
              return res.status(200).json(result);
            } catch (err: any) {
              console.log("lol error");
              this.logger.warn(
                `An error occurred when trying to GET /course/filter ${formatError(
                  err
                )}`
              );
              return next(err);
            }
          }
        )
        .delete(
          "/cached/flush",
          async (
            req: Request<{ key: string }, unknown>,
            res: Response,
            next: NextFunction
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
                  err
                )}`
              );
              return next(err);
            }
          }
        )
        .delete(
          "/cached/:key",
          async (
            req: Request<{ key: string }, unknown>,
            res: Response,
            next: NextFunction
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
                  err
                )}`
              );
              return next(err);
            }
          }
        )
    );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
