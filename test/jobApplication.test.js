const db = require('../models/db'); // Ensure this path is correct
const JobApplication = require('../models/jobApplication'); // Ensure this path is correct

jest.mock('../models/db'); // Mock the db module

describe("JobApplication model", () => {

    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getAll", () => {
        it("should get all job applications", async () => {
            const mockResults = [
                { id: 1, dateofcreation: "2024-01-01", idapplicant: 1, idoffer: 1 },
                { id: 2, dateofcreation: "2024-01-02", idapplicant: 2, idoffer: 2 }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const jobApplications = await JobApplication.getAll();
            expect(jobApplications).toEqual(mockResults);
        });
    });

    describe("getNameAndTitleAndDescriptionByIdApplicant", () => {
        it("should get name, title, and description by applicant id", async () => {
            const mockResults = [
                {
                    title: "Software Engineer",
                    name: "Tech Corp",
                    description: "Develop and maintain software applications.",
                    jaid: 1
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const details = await JobApplication.getNameAndTitleAndDescriptionByIdApplicant(1);
            expect(details).toEqual(mockResults);
        });
    });

    describe("create", () => {
        it("should insert a new job application", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await JobApplication.create(1, 2);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO JobApplication VALUES (NULL, ?, ?, ?)",
                expect.any(Array) // Checking that date and other parameters are passed
            );
        });
    });

    describe("getIdByApplicantAndJobOffer", () => {
        it("should return the job application id for given applicant and job offer ids", async () => {
            const mockResult = [{ id: 1 }];
            db.query.mockResolvedValueOnce([mockResult]); // Mocking the query result

            const id = await JobApplication.getIdByApplicantAndJobOffer(1, 2);
            expect(id).toBe(1);
        });
    });

    describe("getAllByIdOfferWithInfo", () => {
        it("should get all job applications for a given offer with applicant info", async () => {
            const mockResults = [
                {
                    id: 1,
                    dateofcreation: "2024-01-01",
                    lastname: "Doe",
                    firstname: "John",
                    phonenumber: "1234567890",
                    email: "john.doe@example.com"
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const applications = await JobApplication.getAllByIdOfferWithInfo(1);
            expect(applications).toEqual(mockResults);
        });
    });

    describe("delete", () => {
        it("should delete a job application by id", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await JobApplication.delete(1);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM JobApplication WHERE id = ?",
                [1]
            );
        });
    });

    describe("getWithInfo", () => {
        it("should get job application details with additional information", async () => {
            const mockResult = {
                dateofcreation: "2024-01-01",
                id: 1,
                title: "Software Engineer",
                deadline: "2024-06-30",
                name: "Tech Corp",
                description: "Develop and maintain software applications.",
                workload: "Full-time",
                salary: "$100,000",
                place: "New York",
                supervisor: "Jane Doe",
                numberofattachments: 2
            };
            db.query.mockResolvedValueOnce([[mockResult]]); // Mocking the query result

            const details = await JobApplication.getWithInfo(1);
            expect(details).toEqual(mockResult);
        });

        it("should return null if no job application is found with the given id", async () => {
            db.query.mockResolvedValueOnce([[]]); // Empty array for no results

            const details = await JobApplication.getWithInfo(999);
            expect(details).toBeNull();
        });
    });
});
