const db = require("../models/db");
const Admin = require("../models/admin");

describe("Admin model", () => {
  it("should get an admin by email", async () => {
    const admin = await Admin.getByEmail("admin@gmail.com");
    expect(admin.lastname).toBe("Lê");
  });
  it("shouldn't get any admin that isn't registered (by email) ", async () => {
    const admin = await Admin.getByEmail("nope.biolet@leonie.utc.fr");
    expect(admin).toBeNull();
  });
  it("should get all admins", async () => {
    const admins = await Admin.getAll();
    expect(admins.length).toBeGreaterThanOrEqual(1);
  });
  it("should return id of the admin (by the id of the user)", async () => {
    const id = await Admin.getIdByIdUser(18);
    expect(id).toBe(11);
  });
  afterAll(async () => {
    await db.end();
  });
});
