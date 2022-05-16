class Config {
  public readonly apiUri: string;

  constructor() {
    this.apiUri = process.env.VITE_BACKEND_API_URI as string;
  }
}

export default new Config();
