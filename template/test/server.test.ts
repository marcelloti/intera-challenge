import request from "supertest";
import Server from "./../src/server";

let serverObj = null;
let port: Number = null;
beforeAll(async () => {
  port = Number(process.env["APP_PORT"]);
  serverObj = await Server.getNewInstance();
});

it("Should return express server", async (done) => {
  expect(typeof serverObj).toBe("function");
  done();
});

it("Should respond to the GET request on route '/'", async (done) => {
  const expectedResponse = "Hello API";
  const response = await request(serverObj).get("/");
  expect(response.text).toBe(expectedResponse);

  done();
});
