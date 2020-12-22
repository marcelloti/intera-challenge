import request from "supertest";
import Server from "@src/server";
import { Application } from "express";

let serverObj: Application;
beforeAll(async () => {
  serverObj = await Server.getNewInstance();
});

it("Should respond 200 with data to the GET request on route '/api/talents'", async (done) => {
  const response = await request(serverObj)
    .get("/api/talents")
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);
  expect(typeof response.body).toEqual("object");

  done();
});
