import express, { Application } from "express";
import { createExpressServer } from "routing-controllers";
import controllersDeclaration from "./controller/declaration";
import { swaggerLoader } from "./lib/loaders/swagger";

class Server {
  public static async getNewInstance(): Promise<Application> {
    let app: express.Application = await createExpressServer({
      controllers: controllersDeclaration
    });

    app = await swaggerLoader(app);

    return app;
  }

  public static async startServer(port: number): Promise<Application> {
    const serverObj = await Server.getNewInstance();
    serverObj.listen(port);
    return serverObj;
  }
}
export default Server;
