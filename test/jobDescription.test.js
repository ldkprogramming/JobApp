const db = require('../models/db'); // Ensure this path is correct
const JobDescription = require('../models/jobDescription'); // Ensure this path is correct

jest.mock('../models/db'); // Mock the db module

describe("JobDescription model", () => {

    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getAll", () => {
        it("should get all job descriptions", async () => {
            const mockResults = [
                { id: 1, title: "Software Engineer", status: "Open", place: "NY", workload: "Full-time", salary: "100000", description: "Develop software", supervisor: "Jane Doe", type: "Permanent", siren: "123456789" },
                { id: 2, title: "Product Manager", status: "Open", place: "SF", workload: "Full-time", salary: "120000", description: "Manage products", supervisor: "John Smith", type: "Permanent", siren: "987654321" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobDescriptions = await JobDescription.getAll();
            expect(jobDescriptions).toEqual(mockResults);
        });
    });

    describe("create", () => {
        it("should insert a new job description", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await JobDescription.create("Software Engineer", "Open", "Jane Doe", "Permanent", "NY", "Full-time", "100000", "Develop software", "123456789");
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO JobDescription VALUES (NULL,?,?,?,?,?,?,?,?,?)",
                ["Software Engineer", "Open", "Jane Doe", "Permanent", "NY", "Full-time", "100000", "Develop software", "123456789"]
            );
        });
    });

    describe("getAllByIdOrganisation", () => {
        it("should get all job descriptions by organisation id", async () => {
            const mockResults = [
                { id: 1, title: "Software Engineer", status: "Open", place: "NY", workload: "Full-time", salary: "100000", description: "Develop software", supervisor: "Jane Doe", type: "Permanent", idorganisation: "123456789" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobDescriptions = await JobDescription.getAllByIdOrganisation("123456789");
            expect(jobDescriptions).toEqual(mockResults);
        });
    });

});
