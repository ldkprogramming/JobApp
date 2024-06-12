const db = require('../models/db'); // Ensure this path is correct
const JobOffer = require('../models/jobOffer'); // Ensure this path is correct

jest.mock('../models/db'); // Mock the db module

describe("JobOffer model", () => {

    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getAll", () => {
        it("should get all job offers", async () => {
            const mockResults = [
                { id: 1, status: "Open", deadline: "2024-12-31", indication: "Urgent", numberofattachments: 3, idjobdescription: 1, idrecruiter: 1 },
                { id: 2, status: "Closed", deadline: "2024-10-01", indication: "Standard", numberofattachments: 2, idjobdescription: 2, idrecruiter: 2 }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobOffers = await JobOffer.getAll();
            expect(jobOffers).toEqual(mockResults);
        });
    });

    describe("getAllByIdRecruiter", () => {
        it("should get all job offers by recruiter id", async () => {
            const mockResults = [
                { id: 1, status: "Open", deadline: "2024-12-31", indication: "Urgent", numberofattachments: 3, idjobdescription: 1, idrecruiter: 1 }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobOffers = await JobOffer.getAllByIdRecruiter(1);
            expect(jobOffers).toEqual(mockResults);
        });
    });

    describe("getAllByStatusWithInfo", () => {
        it("should get all job offers by status with detailed information", async () => {
            const mockResults = [
                {
                    id: 1,
                    title: "Software Engineer",
                    deadline: "2024-12-31",
                    name: "Tech Corp",
                    description: "Develop and maintain software.",
                    salary: "100000",
                    workload: "Full-time",
                    place: "New York",
                    supervisor: "Jane Doe",
                    numberofattachments: 3
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobOffers = await JobOffer.getAllByStatusWithInfo("Open");
            expect(jobOffers).toEqual(mockResults);
        });
    });

    describe("getAllByStatusByIdRecruiterWithInfo", () => {
        it("should get all job offers by status and recruiter id with detailed information", async () => {
            const mockResults = [
                {
                    id: 1,
                    title: "Software Engineer",
                    jobOfferStatus: "Open",
                    description: "Develop and maintain software.",
                    deadline: "2024-12-31",
                    organisationName: "Tech Corp"
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobOffers = await JobOffer.getAllByStatusByIdRecruiterWithInfo("Open", 1);
            expect(jobOffers).toEqual(mockResults);
        });
    });

    describe("create", () => {
        it("should insert a new job offer", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await JobOffer.create("Open", "2024-12-31", "Urgent", 3, 1, 1);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO JobOffer VALUES (NULL, ?, ?, ?, ?, ?, ?)",
                ["Open", "2024-12-31", "Urgent", 3, 1, 1]
            );
        });
    });

    describe("get", () => {
        it("should get a job offer by id", async () => {
            const mockResult = {
                id: 1,
                status: "Open",
                deadline: "2024-12-31",
                indication: "Urgent",
                numberofattachments: 3,
                idjobdescription: 1,
                idrecruiter: 1
            };
            db.query.mockResolvedValueOnce([[mockResult]]); // Mocking the query result

            const jobOffer = await JobOffer.get(1);
            expect(jobOffer).toEqual(mockResult);
        });

        it("should return null if no job offer is found with the given id", async () => {
            db.query.mockResolvedValueOnce([[]]); // Empty array for no results

            const jobOffer = await JobOffer.get(999);
            expect(jobOffer).toBeNull();
        });
    });

    describe("getWithInfo", () => {
        it("should get job offer details with additional information", async () => {
            const mockResult = {
                status: "Open",
                deadline: "2024-12-31",
                indication: "Urgent",
                title: "Software Engineer",
                name: "Tech Corp"
            };
            db.query.mockResolvedValueOnce([[mockResult]]); // Mocking the query result

            const jobOffer = await JobOffer.getWithInfo(1);
            expect(jobOffer).toEqual(mockResult);
        });

        it("should return null if no job offer is found with the given id", async () => {
            db.query.mockResolvedValueOnce([[]]); // Empty array for no results

            const jobOffer = await JobOffer.getWithInfo(999);
            expect(jobOffer).toBeNull();
        });
    });

});
