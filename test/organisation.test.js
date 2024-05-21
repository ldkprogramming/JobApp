const db = require('../models/db');
const Organisation = require('../models/organisation');

describe("Organisation model", () => {
    it('should get all organisations', async () => {
        const organisations = await Organisation.getAll();
        expect(organisations.length).toBeGreaterThanOrEqual(2);
    });
    it('should get an organisation (by siren/id)', async () => {
        const organisation = await Organisation.getBySiren(123456789);
        expect(organisation.name).toBe('Tech Solutions Inc.');
    });
    it("shouldn't get an organisation that doesn't exist (by siren/id)", async () => {
        const organisation = await Organisation.getBySiren(39939390);
        expect(organisation).toBeNull();
    });
    afterAll(async () => {
        await db.end();
    });
});