import express, { Application } from "express";
import { Action, createExpressServer } from "routing-controllers";
import controllersDeclaration from "./controller/declaration";
import { Auth } from "./lib/auth";
import { swaggerLoader } from "./lib/loaders/swagger";
import helmet from "helmet";
class Server {
  public static async getNewInstance(): Promise<Application> {
    let app: express.Application = await createExpressServer({
      routePrefix: "/api",
      authorizationChecker: async (action: Action) => {
        return await Auth.authChecker(action);
      },
      cors: true,
      controllers: controllersDeclaration
    });

    app = await swaggerLoader(app);

    if (process.env.ENV !== "development") {
      app.set("trust proxy", true);
      app.use(helmet());
      app.disabled("x-powered-by");
    }

    /*
    app.get("/", (req, res) => {
      return res.json({
        message: "Welcome from API"
      });
    });
    */
    return app;
  }

  public static async startServer(port: number): Promise<Application> {
    const serverObj = await Server.getNewInstance();
    serverObj.listen(port);
    return serverObj;
  }
}
export default Server;
