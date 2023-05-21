import { envsafe, port, str, url } from "envsafe";

export const env = envsafe({
  API_PORT: port({
    devDefault: 3030,
    default: 3030,
  }),
  DB_TYPE: str({
    devDefault: "postgres",
    default: "postgres",
    choices: ["postgres", "mysql"],
  }),
  POSTGRESQL_PORT: port({
    default: 5432,
  }),
  POSTGRESQL_HOST: str({
    default: "localhost",
  }),
  POSTGRESQL_USER: str({
    default: "postgres",
  }),
  POSTGRESQL_PASSWORD: str({
    default: "password",
  }),
  POSTGRESQL_DATABASE: str({
    default: "mydb",
  }),
});

export default env;
