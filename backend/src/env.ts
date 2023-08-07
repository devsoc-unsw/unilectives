import { envsafe, port, str } from "envsafe";

export const env = envsafe({
  API_PORT: port({
    devDefault: 3030,
    default: 3030,
  }),
  REDIS_HOST: str({
    devDefault: "localhost",
  }),
  REDIS_USER: str({
    allowEmpty: true,
    devDefault: "",
  }),
  REDIS_PASSWORD: str({
    allowEmpty: true,
    devDefault: "",
  }),
  DATABASE_URL: str({
    devDefault:
      "postgresql://postgres:password@0.0.0.0:5432/mydb?schema=unilectives",
  }),
});

export default env;
