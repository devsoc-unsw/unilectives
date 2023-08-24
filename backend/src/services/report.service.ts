import { ReportRepository } from "../repositories/report.repository";
import { getLogger } from "../utils/logger";
import { HTTPError } from "../utils/errors";
import { badRequest, unauthorizedError } from "../utils/constants";
import { ReviewRepository } from "../repositories/review.repository";
import { UserRepository } from "../repositories/user.repository";
import {
  CreateReport,
  ReportsSuccessResponse,
  ReportSuccessResponse,
  UpdateReportStatus,
} from "../api/schemas/report.schema";

export class ReportService {
  private logger = getLogger();
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllReports(zid: string): Promise<ReportsSuccessResponse> {
    const userInfo = await this.userRepository.getUser(zid);
    if (!userInfo) {
      this.logger.error(`Database could not find user with zid ${zid}`);
      throw new HTTPError(badRequest);
    }

    if (!userInfo.isAdmin) {
      this.logger.error(`Non-admin ${zid} tried retrieving reports`);
      throw new HTTPError(unauthorizedError);
    }

    const reports = await this.reportRepository.getAllReports();
    return {
      reports: reports,
    };
  }

  async createReport(reportDetails: CreateReport) {
    const { reviewId, zid, reason } = reportDetails;

    // check if user already created a report for the review
    const reportExists = await this.reportRepository.getReportByUserAndReview(
      zid,
      reviewId,
    );

    if (reportExists) {
      this.logger.error(
        `Database already has report for user ${zid} and review ${reviewId}`,
      );
      throw new HTTPError(badRequest);
    }

    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) {
      this.logger.error(`Database cannot get review with id ${reviewId}`);
      throw new HTTPError(badRequest);
    }

    const newReport = {
      zid: zid,
      reason: reason,
      reviewId: reviewId,
    };

    const reportResult = await this.reportRepository.newReport(newReport);

    return {
      report: reportResult,
    };
  }

  async updateReport(
    reportDetails: UpdateReportStatus,
  ): Promise<ReportSuccessResponse> {
    const { reportId, zid, status } = reportDetails;

    const reportExists = await this.reportRepository.getReport(reportId);
    if (!reportExists) {
      this.logger.error(`Database could not find report with id ${reportId}`);
      throw new HTTPError(badRequest);
    }

    const user = await this.userRepository.getUser(zid);
    if (!user || user.isAdmin === false) {
      this.logger.error(
        `User with zid ${zid} does not exist or does not have permission to update report status`,
      );
      throw new HTTPError(badRequest);
    }

    const updatedReport = {
      ...reportDetails,
    };

    const reportResult = await this.reportRepository.saveReport(updatedReport);
    this.logger.info(`Admin ${zid} updated report ${reportId} to ${status}`);

    return {
      report: reportResult,
    };
  }
}
