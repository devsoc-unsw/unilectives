import { IHttpError } from "../interfaces/IApiResponses";

export class HTTPError extends Error implements IHttpError {
  errorCode: number;
  errorMessage: string;
  constructor({ errorCode, errorMessage }: IHttpError) {
    super(
      `Error occurred, status code is '${errorCode}', status message is '${errorMessage}'`
    );
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
