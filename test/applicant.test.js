const db = require('../models/db');
const Applicant = require('../models/applicant');
const User = require("../models/user");
const Admin = require("../models/admin");

describe("Applicant model", () => {
    afterAll(async () => {
        await db.end();
    });
    it('should get an applicant by email', async () => {
        const applicant = await Applicant.getByEmail("karlo.e@gmail.com");
        expect(applicant.lastname).toBe("engel");
    });
    it("shouldn't get any applicant that isn't registered (by email)", async () => {
        const applicant = await Applicant.getByEmail("non.biolet@etu.utc.fr");
        expect(applicant).toBeNull();
    });
    it('should get all applicants', async () => {
        const applicants = await Applicant.getAll();
        expect(applicants.length).toBeGreaterThanOrEqual(1);
    });
})