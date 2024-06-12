const db = require('../models/db'); // Ensure this path is correct
const Organisation = require('../models/organisation'); // Ensure this path is correct

jest.mock('../models/db'); // Mock the db module

describe("Organisation model", () => {

    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getBySiren", () => {
        it("should get an organisation by SIREN", async () => {
            const mockResult = { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" };
            db.query.mockResolvedValueOnce([[mockResult]]); // Mocking the query result

            const organisation = await Organisation.getBySiren("123456789");
            expect(organisation).toEqual(mockResult);
        });

        it("should return null if no organisation is found with the given SIREN", async () => {
            db.query.mockResolvedValueOnce([[]]); // Empty array for no results

            const organisation = await Organisation.getBySiren("999999999");
            expect(organisation).toBeNull();
        });
    });

    describe("getAllLikeSiren", () => {
        it("should get all organisations with SIREN like provided", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" },
                { SIREN: "123456780", name: "Inno Ventures", type: "LLP", headquarters: "SF", status: "active" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getAllLikeSiren("123");
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("getAll", () => {
        it("should get all organisations", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" },
                { SIREN: "987654321", name: "Health Corp", type: "Inc", headquarters: "LA", status: "inactive" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getAll();
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("getAllByStatus", () => {
        it("should get all organisations by status", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" },
                { SIREN: "987654321", name: "Health Corp", type: "Inc", headquarters: "LA", status: "active" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getAllByStatus("active");
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("create", () => {
        it("should create a new organisation", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await Organisation.create("123456789", "Tech Corp", "LLC", "NY", "active");
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO Organisation VALUES (?, ?, ?, ?, ?)",
                ["123456789", "Tech Corp", "LLC", "NY", "active"]
            );
        });
    });

    describe("changeStatus", () => {
        it("should update the status of an organisation by SIREN", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await Organisation.changeStatus("123456789", "inactive");
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE Organisation SET status = ? WHERE SIREN = ?",
                ["inactive", "123456789"]
            );
        });
    });

    describe("getAllByIdRecruiter", () => {
        it("should get all organisations by recruiter id with accepted status", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getAllByIdRecruiter(1);
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("getSIRENAndNameByNotIdRecruiterAndStatus", () => {
        it("should get all organisations with a specific status not associated with a recruiter", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getSIRENAndNameByNotIdRecruiterAndStatus(1, "active");
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("getAllExceptOnHold", () => {
        it("should get all organisations except those with 'onhold' status", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" },
                { SIREN: "987654321", name: "Health Corp", type: "Inc", headquarters: "LA", status: "inactive" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getAllExceptOnHold();
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("getAllLikeNameOrSirenExceptOnhold", () => {
        it("should get all organisations by name or SIREN except those with 'onhold' status", async () => {
            const mockResults = [
                { SIREN: "123456789", name: "Tech Corp", type: "LLC", headquarters: "NY", status: "active" },
                { SIREN: "123456780", name: "Inno Ventures", type: "LLP", headquarters: "SF", status: "active" }
            ];
            db.query.mockResolvedValueOnce([mockResults]); // Mocking the query result

            const organisations = await Organisation.getAllLikeNameOrSirenExceptOnhold("123");
            expect(organisations).toEqual(mockResults);
        });
    });

    describe("delete", () => {
        it("should delete an organisation by SIREN", async () => {
            db.query.mockResolvedValueOnce([{}]); // Mocking the query call

            await Organisation.delete("123456789");
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM Organisation WHERE SIREN = ?",
                ["123456789"]
            );
        });
    });

});
