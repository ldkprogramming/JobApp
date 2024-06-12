const db = require('../models/db'); // Ensure this path is correct
const Applicant = require('../models/applicant'); // Ensure this path is correct

jest.mock('../models/db'); // Mock the db module

describe("Applicant model", () => {

    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getByEmail", () => {
        it('should get an applicant by email', async () => {
            const mockResult = [{ id: 1, lastname: "Brown", email: "bob.brown@example.com" }];
            db.query.mockResolvedValueOnce([mockResult]); // Mocking the query result

            const applicant = await Applicant.getByEmail("bob.brown@example.com");
            expect(applicant.lastname).toBe("Brown");
        });

        it("should return null for an unregistered email", async () => {
            db.query.mockResolvedValueOnce([[]]); // Empty array for no results

            const applicant = await Applicant.getByEmail("non.biolet@etu.utc.fr");
            expect(applicant).toBeNull();
        });
    });

    describe("getAll", () => {
        it('should get all applicants', async () => {
            const mockResults = [
                { id: 1, lastname: "Brown", email: "bob.brown@example.com" },
                { id: 2, lastname: "Smith", email: "jane.smith@example.com" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const applicants = await Applicant.getAll();
            expect(applicants.length).toBeGreaterThanOrEqual(1);
            expect(applicants).toEqual(mockResults);
        });
    });

    describe("getIdByIdUser", () => {
        it("should return the applicant id for a given user id", async () => {
            const mockResult = [{ id: 1 }];
            db.query.mockResolvedValueOnce([mockResult]); // Mocking the query result

            const id = await Applicant.getIdByIdUser(1);
            expect(id).toBe(1);
        });

        it("should return null if no applicant found for a given user id", async () => {
            db.query.mockResolvedValueOnce([[]]); // Empty array for no results

            const id = await Applicant.getIdByIdUser(999);
            expect(id).toBeNull();
        });
    });

    describe("create", () => {
        it("should insert a new applicant", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await Applicant.create(1);
            expect(db.query).toHaveBeenCalledWith('INSERT INTO Applicant VALUES (NULL, ?)', [1]);
        });
    });

    describe("deleteById", () => {
        it("should delete an applicant by id", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await Applicant.deleteById(1);
            expect(db.query).toHaveBeenCalledWith('DELETE FROM Applicant WHERE id = ?', [1]);
        });
    });
});
