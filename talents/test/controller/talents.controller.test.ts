import request from "supertest";
import Server from "@src/server";
import { Application } from "express";
import { talentCreateRequest } from "@src/controller/request/talent.request";

let serverObj: Application;
let testTalentId: String;

beforeAll(async () => {
  serverObj = await Server.getNewInstance();
});

it("Should respond 200 with data to the POST request on route '/api/talents' (create Talent action)", async (done) => {
  const newTalent1: talentCreateRequest = {
    first_name: "John",
    last_name: "Doe",
    position: "Fullstack",
    email: "johndoe@test.com",
    phone: 32988887777,
    linkedin: "https://www.linkedin.com/in/johndoe",
    salary_requirements: 250000,
    higher_education: "CS"
  };

  const newTalent2: talentCreateRequest = {
    first_name: "John",
    last_name: "Doe2",
    position: "Fullstack",
    email: "johndoe2@test.com",
    phone: 32988886666,
    linkedin: "https://www.linkedin.com/in/johndoe2",
    salary_requirements: 290000,
    higher_education: "None"
  };

  request(serverObj)
    .post("/api/talents")
    .send(newTalent1)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"])
    .end(function (err, res) {
      expect(typeof res.body._id).not.toBe("undefined");
      testTalentId = res.body._id;
      done();
    });

  request(serverObj)
    .post("/api/talents")
    .send(newTalent2)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"])
    .end(function (err, res) {
      expect(typeof res.body._id).not.toBe("undefined");
      done();
    });
});

it("Should respond 200 with all talents", async (done) => {
  const response = await request(serverObj)
    .get("/api/talents")
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBe(2);
  expect(response.body._id).not.toBe(null);

  done();
});

it("Should respond 200 with one talent", async (done) => {
  const response = await request(serverObj)
    .get(`/api/talents/${testTalentId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);
  expect(response.body._id).not.toBe(null);

  done();
});

it("Should update a registry and respond 200 with updated registry", async (done) => {
  const responseBeforeUpdate = await request(serverObj)
    .get(`/api/talents/${testTalentId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  const talentToBeSend = responseBeforeUpdate.body;

  talentToBeSend.first_name = "jane";
  talentToBeSend.last_name = "doe";
  talentToBeSend.position = "fullstack";
  talentToBeSend.email = "janedoe@mail.com";
  talentToBeSend.linkedin = "https://www.linkedin.com/in/janedoe";
  delete talentToBeSend.updatedAt;

  const responseAfterUpdate = await request(serverObj)
    .put(`/api/talents/${talentToBeSend._id}`)
    .send(talentToBeSend)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(responseAfterUpdate.status).toBe(200);
  const updatedTalent = responseAfterUpdate.body;
  delete updatedTalent.updatedAt;

  expect(updatedTalent).toEqual(talentToBeSend);
  done();
});

it("Should delete a registry and respond 200", async (done) => {
  const response = await request(serverObj)
    .delete(`/api/talents/${testTalentId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(response.status).toBe(200);

  const emptyReturn = await request(serverObj)
    .get(`/api/talents/${testTalentId}`)
    .set("Authorization", "Bearer " + process.env["API_ACCESS_TOKEN"]);

  expect(typeof emptyReturn.body._id).toBe("undefined");
  done();
});
