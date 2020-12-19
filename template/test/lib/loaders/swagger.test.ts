import request from "supertest";
import Server from "./../../../src/server";

let serverObj = null;
beforeAll(async () => {
  serverObj = await Server.getNewInstance();
});

it("Should respond 200 to the GET request on route '/docs'", async (done) => {
  const response = await request(serverObj).get("/");
  expect(response.status).toBe(200);

  done();
});
