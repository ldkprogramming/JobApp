const JobOffer = require('../models/jobOffer');
const db = require('../models/db');

describe("JobOffer model", () => {
    it("should get all job offers", async () => {
        const jobOffers = await JobOffer.getAll();
        console.log(jobOffers);
        expect(jobOffers.length).toBeGreaterThanOrEqual(10);
    });
    afterAll(async () => {
        await db.end();
    })
});