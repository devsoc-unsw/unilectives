import Server from "./Server";
import "reflect-metadata";

const server = new Server();
(async () => {
  await server.start();
})();
