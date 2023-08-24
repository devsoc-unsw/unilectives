import { HTTPError } from "../utils/errors";
import { badRequest, unauthorizedError } from "../utils/constants";
import { ReportService } from "./report.service";
import {
  getReportEntity,
  getMockReports,
  getReviewEntity,
  getMockReview,
  getUserEntity,
} from "../utils/testData";
import { CreateReport, UpdateReportStatus } from "../api/schemas/report.schema";
import { ReportRepository } from "../repositories/report.repository";
import { UserRepository } from "../repositories/user.repository";
import { ReviewRepository } from "../repositories/review.repository";

describe("ReportService", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  const reportRepository = {} as ReportRepository;
  const userRepository = {} as UserRepository;
  const reviewRepository = {} as ReviewRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const reportService = () =>
    new ReportService(reportRepository, reviewRepository, userRepository);

  describe("getAllReports", () => {
    it("should resolve and return report", () => {
      const service = reportService();
      const reports = getMockReports();
      reportRepository.getAllReports = jest.fn().mockReturnValue(reports);
      userRepository.getUser = jest
        .fn()
        .mockReturnValue({ zid: "z1", isAdmin: true });
      expect(service.getAllReports("z1")).resolves.toEqual({
        reports,
      });
    });

    it("should throw HTTP 401 error if user is not an admin", () => {
      const service = reportService();
      const reports = getMockReports();
      reportRepository.getAllReports = jest.fn().mockReturnValue(reports);
      userRepository.getUser = jest
        .fn()
        .mockReturnValue({ zid: "z1", isAdmin: false });
      const errorResult = new HTTPError(unauthorizedError);
      expect(service.getAllReports("z1")).rejects.toThrow(errorResult);
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

      reportRepository.getReportByUserAndReview = jest
        .fn()
        .mockReturnValue(entity);
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

      reportRepository.getReportByUserAndReview = jest
        .fn()
        .mockReturnValue(null);
      reviewRepository.getReview = jest.fn().mockReturnValue(null);

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

      reportRepository.getReportByUserAndReview = jest
        .fn()
        .mockReturnValue(null);
      reviewRepository.getReview = jest.fn().mockReturnValue(reviewEntity);
      reportRepository.newReport = jest.fn().mockReturnValue(reportEntity);

      const reportResult = await service.createReport(reportRequest);
      expect(reportResult.report.status).toEqual("UNSEEN");
      expect(reportResult.report.zid).toEqual(report.zid);
      expect(reportResult.report.reason).toEqual(report.reason);
      // @ts-ignore
      expect(reportResult.report.review).toEqual({
        ...review,
        createdTimestamp: expect.any(Date),
        updatedTimestamp: expect.any(Date),
      });
    });
  });

  describe("updateReport", () => {
    it("should throw HTTP 401 error if user is not an admin", () => {
      const service = reportService();
      const report = getMockReports()[0];
      const userEntity = getUserEntity();
      const reportRequest: UpdateReportStatus = {
        reportId: report.reportId,
        zid: report.zid,
        status: report.status,
      };

      reportRepository.getReport = jest.fn().mockReturnValueOnce(report);
      userRepository.getUser = jest.fn().mockReturnValueOnce(userEntity);

      const errorResult = new HTTPError(unauthorizedError);
      expect(service.updateReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should resolve and return updated report", async () => {
      const service = reportService();
      const date = new Date();
      const reportEntity = getReportEntity(date);
      const report = getMockReports(date)[0];
      const userEntity = getUserEntity();
      userEntity.isAdmin = true;
      const reportRequest: UpdateReportStatus = {
        reportId: report.reportId,
        zid: report.zid,
        status: report.status,
      };

      reportRepository.getReport = jest.fn().mockReturnValueOnce(report);
      userRepository.getUser = jest.fn().mockReturnValueOnce(userEntity);
      reportRepository.updateReport = jest.fn().mockReturnValue(reportEntity);

      const reportResult = await service.updateReport(reportRequest);
      expect(reportResult.report.status).toEqual("UNSEEN");
      expect(reportResult.report.zid).toEqual(report.zid);
      expect(reportResult.report.reason).toEqual(report.reason);
    });
  });
});
