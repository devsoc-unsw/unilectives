import { ReportEntity } from "../entity/Report";
import { EntityManager, In } from "typeorm";

export class ReportRepository {
  constructor(private readonly manager: EntityManager) {}

  async getAllReports(): Promise<ReportEntity[]> {
    return await this.manager
      .createQueryBuilder(ReportEntity, "report")
      .loadRelationIdAndMap("zid", "report.zid")
      .loadRelationIdAndMap("reviewId", "report.reviewId")
      .getMany();
  }

  async getReportByUserAndReview(
    zid: string,
    reviewId: string
  ): Promise<ReportEntity | null> {
    return await this.manager
      .createQueryBuilder(ReportEntity, "report")
      .where("report.reviewId = :reviewId", { reviewId })
      .andWhere("report.zid = :zid", { zid })
      .getOne();
  }

  async getReportsById(ids: string[]): Promise<ReportEntity[]> {
    return await this.manager.findBy(ReportEntity, {
      reportId: In(ids),
    });
  }

  async getReport(reportId: string): Promise<ReportEntity | null> {
    return await this.manager.findOneBy(ReportEntity, {
      reportId,
    });
  }

  async saveReport(report: ReportEntity): Promise<ReportEntity> {
    return await this.manager.save(ReportEntity, report);
  }
}
