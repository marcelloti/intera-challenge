import express, { Application } from "express";

class Server {
  public static async getInstance(): Promise<Application> {
    const app: express.Application = express();
    return app;
  }

  public static async startServer(): Promise<void> {
    const serverObj = Server.getInstance();
    // serverObj.
  }
}
export default Server;
