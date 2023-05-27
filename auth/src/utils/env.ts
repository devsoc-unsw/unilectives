import { envsafe, port, str } from "envsafe";

export const env = envsafe({
  PORT: port({
    default: 8080,
  }),
  DB_CONN: str({
    devDefault: "postgresql://postgres:password@0.0.0.0:5432/mydb",
  }),
  JWT_SECRET: str({
    devDefault: "mysecretjwt"
  })
});
