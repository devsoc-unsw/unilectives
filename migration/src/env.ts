import { envsafe, port, str } from 'envsafe';
import { FirebaseOptions } from 'firebase/app';

export const env =  envsafe({
  API_PORT: port({
    default: 8080,
  }),
  CIRCLES_URL: str({
    default: "https://circlesapi.csesoc.app",
  }),
  DB_TYPE: str({
    default: "postgres",
    choices: ["postgres", "mysql"],
  }),
  DB_PORT: port({
    default:  5432,
  }), 
  DB_HOST: str({
    default: "localhost",
  }), 
  DB_USERNAME: str({
    default: "postgres",
  }),
  DB_PASWORD: str({
    default: "pass",
  }),
  DB: str({
    default:  "mydb",
  }),
  AUTH_DOMAIN: str({
  }),
  PROJECT_ID: str({
  }),
  STORAGE_BUCKET: str({
  }),
});

