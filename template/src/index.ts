import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import Server from "./server";
const port = Number(process.env["APP_PORT"]);

console.log(`Microservice Started !`);
Server.startServer(port);
