import { connect, close } from "@src/config/database";
import Example from "@src/schema/example";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

it("should insert example on database", async (done) => {
  const example = new Example({
    title: "Example"
  });

  await example.save(function (err) {
    if (err) console.error(err);
  });

  done();
});
