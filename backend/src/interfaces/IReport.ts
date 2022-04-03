export type ReportStatus = "UNSEEN" | "SEEN" | "REMOVED" | "SETTLED";

export interface IReport {
  reportId: string;
  reviewId: string;
  zid: string;
  status: ReportStatus;
  reason: string;
}
