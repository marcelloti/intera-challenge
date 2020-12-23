import express, { Application } from "express";
import { Action, useExpressServer } from "routing-controllers";
import controllersDeclaration from "./controller/declaration";
import { Auth } from "./lib/auth";
import { swaggerLoader } from "./lib/loaders/swagger";
import { databaseLoader } from "./lib/loaders/database";
import helmet from "helmet";
import { workersLoader } from "./lib/loaders/workers";

class Server {
  public static async getNewInstance(): Promise<Application> {
    let app: Application = express();
    app.use(helmet());

    await useExpressServer(app, {
      routePrefix: "/api",
      authorizationChecker: async (action: Action) => {
        return await Auth.authChecker(action);
      },
      cors: true,
      controllers: controllersDeclaration
    });

    app = await swaggerLoader(app);
    await databaseLoader();
    await workersLoader();

    if (process.env.ENV !== "development") {
      app.set("trust proxy", true);
      app.disabled("x-powered-by");
    }

    return app;
  }

  public static async startServer(port: number): Promise<Application> {
    const serverObj = await Server.getNewInstance();
    serverObj.listen(port);
    return serverObj;
  }
}
export default Server;
