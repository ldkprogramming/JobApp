const db = require('../models/db');
const Recruiter = require('../models/recruiter');

describe('Recruiter model', () => {
    it('should get all recruiters', async () => {
        const recruiters = await Recruiter.getAll();
        console.log(recruiters);
        expect(recruiters.length).toBeGreaterThanOrEqual(1);
    });
    afterAll(async () => {
        await db.end();
    });
    it('should get a recruiter by its email', async () => {
        const recruiter = await Recruiter.getByEmail("nils.rivaillon@etu.utc.fr");
        expect(recruiter.lastname).toBe("Rivaillon");
    });
    it("shouldn't get any recruiter that isn't registered (by email)", async () => {
        const recruiter = await Recruiter.getByEmail("non.biolet@etu.utc.fr");
        expect(recruiter).toBeNull();
    });
});