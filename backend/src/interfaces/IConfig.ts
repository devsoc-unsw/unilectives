export interface IApiConfig {
  port: number;
}

export interface IConfig {
  api: IApiConfig;
}

export interface IDatabaseConfig {
  type: "postgres";
  host: string;
  port: number;
  schema: string;
}
