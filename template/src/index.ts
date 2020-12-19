import "reflect-metadata";
require("dotenv").config();
import Server from "./server";
const port: Number = Number(process.env["APP_PORT"]);
Server.startServer(port);
