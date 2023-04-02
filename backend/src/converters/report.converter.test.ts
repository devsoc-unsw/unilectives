import { getReportEntity, getMockReports } from "../utils/testData";
import {
  convertReportEntityToInterface,
  convertReportInterfaceToEntity,
} from "./report.converter";

describe("convertReportEntityToInterface", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert ReportEntity to IReport", () => {
    const date = new Date();
    const entity = getReportEntity(date);
    const report = getMockReports(date)[0];
    expect(convertReportEntityToInterface(entity)).toEqual(report);
  });
});

describe("convertReportInterfaceToEntity", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert IReport to ReportEntity", () => {
    const date = new Date();
    const entity = getReportEntity(date);
    const report = getMockReports(date)[0];
    expect(convertReportInterfaceToEntity(report)).toEqual(entity);
  });
});
