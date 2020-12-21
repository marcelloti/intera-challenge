import request from "supertest";
import Server from "@src/server";
import { Application } from "express";

let serverObj: Application;
beforeAll(async () => {
  serverObj = await Server.getNewInstance();
});

it("Should return express server", async (done) => {
  expect(typeof serverObj).toBe("function");
  done();
});

it("Should respond unathorized to the GET request on route '/'", async (done) => {
  const response = await request(serverObj).get("/");
  expect(response.status).toBe(401);

  done();
});

it("Should respond to the GET request on route '/'", async (done) => {
  const expectedResponse = JSON.stringify("Hello API");
  const response = await request(serverObj)
    .get("/")
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);
  expect(response.text).toBe(expectedResponse);

  done();
});
