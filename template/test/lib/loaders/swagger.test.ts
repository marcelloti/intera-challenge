import request from "supertest";
import Server from "@src/server";
import { Application } from "express";

let serverObj: Application;
beforeAll(async () => {
  serverObj = await Server.getNewInstance();
});

it("Should respond 200 to the GET request on route '/docs'", async (done) => {
  const response = await request(serverObj).get("/docs");

  // 301 "Redirect status" because swagger-ui returns this status code
  expect(response.status).toBe(301);

  done();
});
