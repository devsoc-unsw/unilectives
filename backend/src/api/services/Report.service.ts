import { ReportRepository } from "../../repositories/Report.repository";
import { getLogger } from "../../utils/Logger";
import { ReportEntity } from "../../entity/Report";
import { convertReportEntityToInterface } from "../../converters/Report.converter";
import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import { ReportStatus } from "../../interfaces/IReport";
import {
  IGetAllReportsSuccessResponse,
  IPostReportRequestBody,
  IPostReportSuccessResponse,
} from "../../interfaces/IApiResponses";
import { EntityManager } from "typeorm";
import { ReviewRepository } from "../../repositories/Review.repository";

export class ReportService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}
  private reportRepository = new ReportRepository(this.manager);
  private reviewRepository = new ReviewRepository(this.manager);

  async getAllReports(): Promise<IGetAllReportsSuccessResponse> {
    const reports: ReportEntity[] = await this.reportRepository.getAllReports();
    return {
      reports: reports.map(convertReportEntityToInterface),
    };
  }

  async createReport(
    reportDetails: IPostReportRequestBody
  ): Promise<IPostReportSuccessResponse> {
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
    newReport.status = "UNSEEN" as ReportStatus;

    const reportResult: ReportEntity = await this.reportRepository.saveReport(
      newReport
    );

    return {
      report: convertReportEntityToInterface(reportResult),
    };
  }
}
