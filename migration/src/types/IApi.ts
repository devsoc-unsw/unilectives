export type Result = "SUCCESS" | "FAILURE";

export interface IResponse {
  status: Result;
  message: string;
}
