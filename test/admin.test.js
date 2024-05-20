const db = require('../models/db');
const Admin = require("../models/admin");

describe("Admin model", () => {
    it('should get an admin by email', async () => {
        const admin = await Admin.getByEmail("leonie.biolet@etu.utc.fr");
        expect(admin.lastname).toBe("Biolet");
    });
    it('shouldn\'t get any admin that isn\'t registered (by email) ', async () => {
        const admin = await Admin.getByEmail("nope.biolet@leonie.utc.fr");
        expect(admin).toBeNull();
    });
    it('should get all admins', async () => {
        const admins = await Admin.getAll();
        expect(admins.length).toBeGreaterThanOrEqual(1);
    });
    afterAll(async () => {
        await db.end();
    })
})