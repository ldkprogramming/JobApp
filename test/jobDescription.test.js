const db = require("../models/db");
const JobDescription = require("../models/jobDescription");

describe("JobDescription model", () => {
    it("should create a job description", async () => {
        await JobDescription.create(
            'title',
            'status',
            'supervisor',
            'type',
            'place',
            'workload',
            'salary',
            'description',
            '123456789');
        expect((await db.query(
            "Select * FROM JobDescription WHERE status = 'status'"
        )).length).toBeGreaterThanOrEqual(1);
    });
    afterAll(async () => {
        await db.end();
    });
});