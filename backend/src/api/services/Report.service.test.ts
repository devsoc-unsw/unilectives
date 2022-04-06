import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import { ReportService } from "./Report.service";
import { getReportEntity, getMockReports } from "../../utils/testData";
import { EntityManager, DataSource } from "typeorm";

describe("ReportService", () => {
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

      const createQueryBuilder: any = {
        loadRelationIdAndMap: () => createQueryBuilder,
        getMany: () => reports,
      };
      jest
        .spyOn(manager, "createQueryBuilder")
        .mockImplementation(() => createQueryBuilder);

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

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => entity,
      };
      jest
        .spyOn(manager, "createQueryBuilder")
        .mockImplementation(() => createQueryBuilder);

      const errorResult = new HTTPError(badRequest);
      expect(service.createReport(report)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new created report", () => {
      const service = reportService();
      const entity = getReportEntity();
      const report = getMockReports()[0];

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => null,
      };
      jest
        .spyOn(manager, "createQueryBuilder")
        .mockImplementation(() => createQueryBuilder);

      manager.save = jest.fn().mockReturnValue(entity);
      expect(service.createReport(report)).resolves.toEqual({ report });
    });
  });
});
