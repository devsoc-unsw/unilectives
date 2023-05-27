import pino from "pino";

export const logger = pino({
  redact: ["DB_CONN"],
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  base: undefined,
  level: "debug",
  timestamp() {
    return `,"timestamp":"${new Date().toISOString()}"`;
  },
});
