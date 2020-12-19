import Server from "./../server";

let serverObj = null;
beforeAll(async () => {
  serverObj = await Server.getInstance();
});

it("Should return express server", async () => {
  expect(typeof serverObj).toBe("function");
});

it("Should start express server", async () => {});
