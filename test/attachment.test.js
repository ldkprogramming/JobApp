const db = require("../models/db");
const Attachment = require("../models/attachment");

jest.mock("../models/db");

describe("Attachment model", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAll", () => {
        it("should get all attachments", async () => {
            const mockAttachments = [
                { id: 1, idapplication: 1, data: "data1", name: "name1", type: "type1" },
                { id: 2, idapplication: 2, data: "data2", name: "name2", type: "type2" }
            ];
            db.query.mockResolvedValueOnce([mockAttachments]);

            const attachments = await Attachment.getAll();

            expect(attachments).toEqual(mockAttachments);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM Attachment");
        });
    });

    describe("getAllByIdApplication", () => {
        it("should get all attachments by application ID", async () => {
            const mockAttachments = [
                { id: 1, idapplication: 1, data: "data1", name: "name1", type: "type1" },
                { id: 2, idapplication: 1, data: "data2", name: "name2", type: "type2" }
            ];
            const idApplication = 1;
            db.query.mockResolvedValueOnce([mockAttachments]);

            const attachments = await Attachment.getAllByIdApplication(idApplication);

            expect(attachments).toEqual(mockAttachments);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM Attachment WHERE idapplication = ?", [idApplication]);
        });
    });

    describe("create", () => {
        it("should insert a new attachment", async () => {
            const idApplication = 1;
            const data = "data";
            const name = "name";
            const type = "type";
            const expectedInsertId = 1;

            // Mocking the db.query function to resolve with an array containing an object
            db.query.mockResolvedValueOnce([{ insertId: expectedInsertId }]);

            // Call the create method and store the return value
            const insertId = await Attachment.create(idApplication, data, name, type);

            // Assertions
            expect(insertId).toEqual(expectedInsertId);
            expect(db.query).toHaveBeenCalledWith("INSERT INTO Attachment VALUES (NULL, ?, ?, ?, ?)", [idApplication, data, name, type]);
        });
    });


    describe("deleteByIdApplication", () => {
        it("should delete attachments by application ID", async () => {
            const idApplication = 1;
            await Attachment.deleteByIdApplication(idApplication);

            expect(db.query).toHaveBeenCalledWith("DELETE FROM Attachment WHERE idapplication = ?", [idApplication]);
        });
    });
});
