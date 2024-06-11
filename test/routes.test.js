const request = require("supertest");
const admin = require("../routes/admins");

describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(admin)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
