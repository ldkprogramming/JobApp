const db = require('../models/db');
const Recruiter = require('../models/recruiter');

describe('Recruiter model', () => {
    it('should get all recruiters', async () => {
        const recruiters = await Recruiter.getAll();
        expect(recruiters.length).toBeGreaterThanOrEqual(2);
    });
    afterAll(async () => {
        await db.end();
    });
    it('should get a recruiter by its email', async () => {
        const recruiter = await Recruiter.getByEmail("emily.clark@example.com");
        expect(recruiter.lastname).toBe("Clark");
    });
    it("shouldn't get any recruiter that isn't registered (by email)", async () => {
        const recruiter = await Recruiter.getByEmail("non.biolet@etu.utc.fr");
        expect(recruiter).toBeNull();
    });
});