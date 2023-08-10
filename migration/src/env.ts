import { envsafe, port, str, url } from "envsafe";

export const env = envsafe({
  API_PORT: port({
    default: 8080,
  }),
  CIRCLES_URL: url({
    default: "https://circlesapi.csesoc.app",
  }),
  DB_TYPE: str({
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
  AUTHDOMAIN: str({default:"cselectives.firebaseapp.com"}),
  PROJECT_ID: str({default:"cselectives"}),
  STORAGE_BUCKET: str({default:"cselectives.appspot.com"}),
});
