const AdminOrganisation = require('../models/adminOrganisation');
const db = require('../models/db');
describe("AdminOrganisation model", () => {
    it('should get all admin organisation requests', async () => {
        const adminOrganisations = await AdminOrganisation.getAll();
        expect(adminOrganisations.length).toBeGreaterThanOrEqual(10);
    });
    it('should get all admin organisation requests by status', async() => {
        const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo('accepted');
        expect(adminOrganisations.length).toBeGreaterThanOrEqual(3);
    });
    afterAll(async () => {
        await db.end();
    });
})