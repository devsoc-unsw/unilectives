import { ReportRepository } from "../repositories/report.repository";
import { getLogger } from "../utils/logger";
import { ReportEntity } from "../entity/Report";
import { convertReportEntityToInterface } from "../converters/report.converter";
import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { EntityManager } from "typeorm";
import { ReviewRepository } from "../repositories/review.repository";
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entity/User";
import { z } from "zod";
import {
  CreateReportSchema,
  ReportsSuccessResponse,
  ReportSuccessResponse,
  UpdateReportStatusSchema,
} from "../api/schemas/report.schema";

export class ReportService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}
  private reportRepository = new ReportRepository(this.manager);
  private reviewRepository = new ReviewRepository(this.manager);
  private userRepository = new UserRepository(this.manager);

  async getAllReports(): Promise<z.infer<typeof ReportsSuccessResponse>> {
    const reports: ReportEntity[] = await this.reportRepository.getAllReports();
    return {
      reports: reports.map(convertReportEntityToInterface),
    };
  }

  async createReport(
    reportDetails: z.infer<typeof CreateReportSchema>
  ): Promise<z.infer<typeof ReportSuccessResponse>> {
    const { reviewId, zid, reason } = reportDetails;

    // check if user already created a report for the review
    const reportExists: ReportEntity | null =
      await this.reportRepository.getReportByUserAndReview(zid, reviewId);

    if (reportExists) {
      this.logger.error(
        `Database already has report for user ${zid} and review ${reviewId}`
      );
      throw new HTTPError(badRequest);
    }

    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) {
      this.logger.error(`Database cannot get review with id ${reviewId}`);
      throw new HTTPError(badRequest);
    }

    const newReport = new ReportEntity();
    newReport.review = review;
    newReport.zid = zid;
    newReport.reason = reason;
    newReport.status = "UNSEEN";

    const reportResult: ReportEntity = await this.reportRepository.saveReport(
      newReport
    );

    return {
      report: convertReportEntityToInterface(reportResult),
    };
  }

  async updateReport(
    reportDetails: z.infer<typeof UpdateReportStatusSchema>
  ): Promise<z.infer<typeof ReportSuccessResponse>> {
    const { reportId, zid, status } = reportDetails;

    const reportExists: ReportEntity | null =
      await this.reportRepository.getReport(reportId);
    if (!reportExists) {
      this.logger.error(`Database could not find report with id ${reportId}`);
      throw new HTTPError(badRequest);
    }

    const user: UserEntity | null = await this.userRepository.getUser(zid);
    if (!user || user.isAdmin === false) {
      this.logger.error(
        `User with zid ${zid} does not exist or does not have permission to update report status`
      );
      throw new HTTPError(badRequest);
    }

    const updatedReport = reportExists;
    updatedReport.status = status;

    const reportResult: ReportEntity = await this.reportRepository.saveReport(
      updatedReport
    );

    return {
      report: convertReportEntityToInterface(reportResult),
    };
  }
}
