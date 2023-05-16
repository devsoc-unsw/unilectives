import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { ReportService } from "./report.service";
import {
  getReportEntity,
  getMockReports,
  getReviewEntity,
  getMockReview,
  getUserEntity,
} from "../utils/testData";
import { EntityManager, DataSource } from "typeorm";
import { CreateReport, UpdateReportStatus } from "../api/schemas/report.schema";

describe("ReportService", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  let manager: EntityManager;
  let connection: DataSource;

  beforeEach(() => {
    connection = new DataSource({ type: "postgres" });
    manager = new EntityManager(connection);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const reportService = () => new ReportService(manager);

  describe("getAllReports", () => {
    it("should resolve and return report", () => {
      const service = reportService();
      const reports = getMockReports();
      manager.find = jest.fn().mockReturnValue(reports);
      expect(service.getAllReports()).resolves.toEqual({
        reports,
      });
    });
  });

  describe("createReport", () => {
    it("should throw HTTP 400 error if user attempted to report the same review in database", () => {
      const service = reportService();
      const entity = getReportEntity();
      const report = getMockReports()[0];
      const reportRequest: CreateReport = {
        reviewId: report.review.reviewId,
        reason: report.reason,
        zid: report.zid,
      };

      manager.findOneBy = jest.fn().mockReturnValue(entity);
      const errorResult = new HTTPError(badRequest);
      expect(service.createReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if review is not in database", () => {
      const service = reportService();
      const report = getMockReports()[0];
      const reportRequest: CreateReport = {
        reviewId: report.review.reviewId,
        reason: report.reason,
        zid: report.zid,
      };

      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null);

      const errorResult = new HTTPError(badRequest);
      expect(service.createReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new created report", async () => {
      const service = reportService();
      const reportEntity = getReportEntity();
      const report = getMockReports()[0];
      const reviewEntity = getReviewEntity();
      const review = getMockReview();
      const reportRequest: CreateReport = {
        reviewId: report.review.reviewId,
        reason: report.reason,
        zid: report.zid,
      };

      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(reviewEntity);
      manager.save = jest.fn().mockReturnValue(reportEntity);

      const reportResult = await service.createReport(reportRequest);
      expect(reportResult.report.status).toEqual("UNSEEN");
      expect(reportResult.report.zid).toEqual(report.zid);
      expect(reportResult.report.reason).toEqual(report.reason);
      expect(reportResult.report.review).toEqual({
        ...review,
        createdTimestamp: expect.any(Date),
        updatedTimestamp: expect.any(Date),
      });
    });
  });

  describe("updateReport", () => {
    it("should throw HTTP 400 error if report is not in database", () => {
      const service = reportService();
      const report = getMockReports()[0];
      const reportRequest: UpdateReportStatus = {
        reportId: report.reportId,
        zid: report.zid,
        status: report.status,
      };

      manager.findOne = jest.fn().mockReturnValue(null);
      const errorResult = new HTTPError(badRequest);
      expect(service.updateReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if user is not in database", () => {
      const service = reportService();
      const reportEntity = getReportEntity();
      const report = getMockReports()[0];
      const reportRequest: UpdateReportStatus = {
        reportId: report.reportId,
        zid: report.zid,
        status: report.status,
      };

      manager.findOne = jest.fn().mockReturnValueOnce(reportEntity);
      manager.findOneBy = jest.fn().mockReturnValueOnce(null);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if user is not an admin", () => {
      const service = reportService();
      const reportEntity = getReportEntity();
      const report = getMockReports()[0];
      const userEntity = getUserEntity();
      const reportRequest: UpdateReportStatus = {
        reportId: report.reportId,
        zid: report.zid,
        status: report.status,
      };

      manager.findOne = jest.fn().mockReturnValueOnce(reportEntity);
      manager.findOneBy = jest.fn().mockReturnValueOnce(userEntity);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should resolve and return updated report", async () => {
      const service = reportService();
      const date = new Date();
      const reportEntity = getReportEntity(date);
      const report = getMockReports(date)[0];
      const review = getMockReview(date);
      const userEntity = getUserEntity();
      userEntity.isAdmin = true;
      const reportRequest: UpdateReportStatus = {
        reportId: report.reportId,
        zid: report.zid,
        status: report.status,
      };

      manager.findOne = jest.fn().mockReturnValueOnce(reportEntity);
      manager.findOneBy = jest.fn().mockReturnValueOnce(userEntity);
      manager.save = jest.fn().mockReturnValue(reportEntity);

      const reportResult = await service.updateReport(reportRequest);
      expect(reportResult.report.status).toEqual("UNSEEN");
      expect(reportResult.report.zid).toEqual(report.zid);
      expect(reportResult.report.reason).toEqual(report.reason);
      expect({
        ...reportResult.report.review,
        updatedTimestamp: date,
        createdTimestamp: date,
      }).toEqual(review);
    });
  });
});
