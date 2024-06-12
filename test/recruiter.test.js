const db = require('../models/db'); // Ensure the path is correct
const Recruiter = require('../models/recruiter'); // Ensure the path is correct

jest.mock('../models/db'); // Mock the db module

describe("Recruiter model", () => {
    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getByEmail", () => {
        it("should get a recruiter by email", async () => {
            const mockResult = {
                id: 1,
                email: "recruiter@example.com",
                lastname: "Doe",
                firstname: "John",
                phonenumber: "1234567890",
                status: "active",
                iduser: 1
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const recruiter = await Recruiter.getByEmail("recruiter@example.com");
            expect(recruiter).toEqual(mockResult);
        });

        it("should return null if no recruiter is found with the given email", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const recruiter = await Recruiter.getByEmail("nonexistent@example.com");
            expect(recruiter).toBeNull();
        });
    });

    describe("getAll", () => {
        it("should get all recruiters", async () => {
            const mockResults = [
                { id: 1, email: "recruiter1@example.com", lastname: "Doe", firstname: "John", phonenumber: "1234567890", iduser: 1 },
                { id: 2, email: "recruiter2@example.com", lastname: "Smith", firstname: "Jane", phonenumber: "0987654321", iduser: 2 }
            ];
            db.query.mockResolvedValueOnce([mockResults]);

            const recruiters = await Recruiter.getAll();
            expect(recruiters).toEqual(mockResults);
        });
    });

    describe("getIdByIdUser", () => {
        it("should get the recruiter ID by user ID", async () => {
            const mockResult = { id: 1 };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const recruiterId = await Recruiter.getIdByIdUser(1);
            expect(recruiterId).toBe(1);
        });

        it("should return null if no recruiter is found with the given user ID", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const recruiterId = await Recruiter.getIdByIdUser(999);
            expect(recruiterId).toBeNull();
        });
    });

    describe("create", () => {
        it("should create a new recruiter", async () => {
            db.query.mockResolvedValueOnce([{}]);

            await Recruiter.create(1, "pending");
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO Recruiter VALUES (NULL, ?, ?)",
                [1, "pending"]
            );
        });
    });

    describe("getAllByStatusWithInfo", () => {
        it("should get all recruiters by status with additional info", async () => {
            const mockResults = [
                {
                    idrecruiter: 1,
                    iduser: 1,
                    email: "recruiter@example.com",
                    lastname: "Doe",
                    firstname: "John",
                    phonenumber: "1234567890",
                    dateofcreation: "2023-01-01",
                    userstatus: "active",
                    recruiterstatus: "pending"
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]);

            const recruiters = await Recruiter.getAllByStatusWithInfo("pending");
            expect(recruiters).toEqual(mockResults);
        });
    });

    describe("changeStatusRecruiter", () => {
        it("should update the status of a recruiter by recruiter ID", async () => {
            db.query.mockResolvedValueOnce([{}]);

            await Recruiter.changeStatusRecruiter("active", 1);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE Recruiter SET status = ? WHERE id = ?",
                ["active", 1]
            );
        });
    });

    describe("delete", () => {
        it("should delete a recruiter by ID", async () => {
            db.query.mockResolvedValueOnce([{}]);

            await Recruiter.delete(1);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM Recruiter WHERE id=?",
                [1]
            );
        });
    });

    describe("getAllJoining", () => {
        it("should get all recruiters with onhold status joining accepted organisations", async () => {
            const mockResults = [
                {
                    id: 1,
                    status: "onhold",
                    email: "recruiter@example.com",
                    iduser: 1,
                    lastname: "Doe",
                    firstname: "John",
                    phonenumber: "1234567890",
                    SIREN: "123456789",
                    name: "Tech Corp"
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]);

            const recruiters = await Recruiter.getAllJoining();
            expect(recruiters).toEqual(mockResults);
        });
    });

    describe("getIdUserById", () => {
        it("should get the user ID by recruiter ID", async () => {
            const mockResult = { iduser: 1 };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const userId = await Recruiter.getIdUserById(1);
            expect(userId).toBe(1);
        });

        it("should return null if no user is found with the given recruiter ID", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const userId = await Recruiter.getIdUserById(999);
            expect(userId).toBeNull();
        });
    });

});
