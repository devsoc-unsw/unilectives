export default class HTTPError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string) {
    super();
    this.status = status;
    this.statusText = statusText;
  }
}
