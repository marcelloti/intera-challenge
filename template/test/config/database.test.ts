import { connect, close } from "@src/config/database";
import Talent from "@src/schema/talents";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

it("should insert talent on database", async (done) => {
  const talent = new Talent({
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@test.com",
    phone: 32988887777,
    linkedin: "https://www.linkedin.com/in/johndoe",
    salary_requirements: 250000
  });

  await talent.save(function (err) {
    if (err) console.error(err);
  });

  done();
});
