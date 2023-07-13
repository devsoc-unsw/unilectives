import { PrismaClient } from "@prisma/client";
import {
  CreateReport,
  Report,
  ReportSchema,
  UpdateReportStatus,
} from "../api/schemas/report.schema";

export class ReportRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllReports(): Promise<Report[]> {
    const rawReports = await this.prisma.reports.findMany({
      include: {
        users: true,
      },
    });
    const reports = rawReports.map((report) => ReportSchema.parse(report));
    return reports;
  }

  async getReportByUser(zid: string): Promise<Report[]> {
    const rawReports = await this.prisma.reports.findMany({
      where: {
        zid: zid,
      },
      include: {
        reviews: true,
      },
    });
    const reports = rawReports.map((report) => ReportSchema.parse(report));
    return reports;
  }

  async getReportByUserAndReview(
    zid: string,
    reviewId: string
  ): Promise<Report | null> {
    const rawReport = await this.prisma.reports.findFirst({
      where: {
        zid: zid,
        reviewId: reviewId,
      },
      include: {
        users: true,
      },
    });
    const report = ReportSchema.parse(rawReport);
    return report;
  }

  async getReport(reportId: string): Promise<Report | null> {
    const rawReport = await this.prisma.reports.findUnique({
      where: {
        reportId: reportId,
      },
      include: {
        users: true,
      },
    });
    const report = ReportSchema.parse(rawReport);
    return report;
  }

  async newReport(report: CreateReport): Promise<Report> {
    const rawReport = await this.prisma.reports.create({
      data: {
        ...report,
        status: "UNSEEN",
      },
      include: {
        users: true,
      },
    });
    const savedReport = ReportSchema.parse(rawReport);
    return savedReport;
  }

  async saveReport(report: UpdateReportStatus): Promise<Report> {
    const rawReport = await this.prisma.reports.update({
      where: {
        reportId: report.reportId,
      },
      data: {
        ...report,
      },
      include: {
        users: true,
      },
    });
    const savedReport = ReportSchema.parse(rawReport);
    return savedReport;
  }
}
