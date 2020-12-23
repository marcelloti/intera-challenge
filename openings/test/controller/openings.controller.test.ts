import request from "supertest";
import Server from "@src/server";
import { Application } from "express";
import { openingCreateRequest } from "@src/controller/request/opening.request";

let serverObj: Application;
let testOpeningId: String;

beforeAll(async () => {
  serverObj = await Server.getNewInstance();
});

it("Should respond 200 with data to the POST request on route '/api/openings' (create Opening action)", async (done) => {
  const newOpening1: openingCreateRequest = {
    title: "node.js fullstack developer",
    position: "fullstack",
    seniority_level: "senior",
    location: "sao Paulo / SP",
    remote_job: 1,
    work_schedule: "08:00 - 12:00 PM / 13:00 - 17:00",
    job_responsibilities: [
      "create scalable algorithms",
      "be an leader to the team",
      "improve code of existing applications"
    ],
    job_requirements: ["node.js", "mongodb", "clean code", "tdd", "react"]
  };

  const newOpening2: openingCreateRequest = {
    title: "react developer",
    position: "frontend",
    seniority_level: "junior",
    location: "rio de janeiro / rj",
    remote_job: 2,
    work_schedule: "07:00 - 11:00 PM / 12:00 - 16:00",
    job_responsibilities: ["create mobile friendly pages", "skin in the game"],
    job_requirements: ["react", "Redux", "bootstrap"]
  };

  request(serverObj)
    .post("/api/openings")
    .send(newOpening1)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"])
    .end(function (err, res) {
      expect(typeof res.body._id).not.toBe("undefined");
      testOpeningId = res.body._id;
      done();
    });

  request(serverObj)
    .post("/api/openings")
    .send(newOpening2)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"])
    .end(function (err, res) {
      expect(typeof res.body._id).not.toBe("undefined");
      done();
    });
});

it("Should respond 200 with all openings", async (done) => {
  const response = await request(serverObj)
    .get("/api/openings")
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBe(2);
  expect(response.body._id).not.toBe(null);

  done();
});

it("Should respond 200 with one opening", async (done) => {
  const response = await request(serverObj)
    .get(`/api/openings/${testOpeningId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);
  expect(response.body._id).not.toBe(null);

  done();
});

it("Should respond 200 with one opening (find)", async (done) => {
  const position = "fullstack";
  const response = await request(serverObj)
    .get(`/api/openings/findBy/position/${position}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);
  expect(response.body._id).not.toBe(null);
  done();
});

it("Should update a registry and respond 200 with updated registry", async (done) => {
  const responseBeforeUpdate = await request(serverObj)
    .get(`/api/openings/${testOpeningId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  const openingToBeSend = responseBeforeUpdate.body;

  openingToBeSend.title = "node.js developer";
  openingToBeSend.position = "backend";
  delete openingToBeSend.updatedAt;

  const responseAfterUpdate = await request(serverObj)
    .put(`/api/openings/${openingToBeSend._id}`)
    .send(openingToBeSend)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(responseAfterUpdate.status).toBe(200);
  const updatedOpening = responseAfterUpdate.body;
  delete updatedOpening.updatedAt;

  expect(updatedOpening).toEqual(openingToBeSend);
  done();
});

it("Should delete a registry and respond 200", async (done) => {
  const response = await request(serverObj)
    .delete(`/api/openings/${testOpeningId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);

  const emptyReturn = await request(serverObj)
    .get(`/api/openings/${testOpeningId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(typeof emptyReturn.body._id).toBe("undefined");
  done();
});
