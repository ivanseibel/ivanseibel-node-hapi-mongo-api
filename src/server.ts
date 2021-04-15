/* eslint-disable no-console */
import * as hapi from "@hapi/hapi";
import { routes } from "./v1/routes";
import { AppEnvs } from "./envs";

const server: hapi.Server = new hapi.Server({
  port: AppEnvs.SERVER_PORT,
  router: { isCaseSensitive: false }
});

export class AppServer {
  static async init() {
    try {
      server.route(routes);
      
      await server.start();

      console.info(
        `🚀  API server started in port : ${server.info.port}, ready for connections!`
      );
    } catch (error) {
      console.error("App failed to start", error);
      throw error;
    }
  }
}
