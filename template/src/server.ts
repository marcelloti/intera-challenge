import express, { Application } from "express";
import { createExpressServer } from "routing-controllers";
import controllersDeclaration from "./controller/declaration";

class Server {
  public static async getNewInstance(): Promise<Application> {
    const app: express.Application = await createExpressServer({
      controllers: controllersDeclaration
    });

    return app;
  }

  public static async startServer(port: number): Promise<Application> {
    const serverObj = await Server.getNewInstance();
    serverObj.listen(port);
    return serverObj;
  }
}
export default Server;
