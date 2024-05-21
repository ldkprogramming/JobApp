const db = require('../models/db');
const Attachment = require('../models/attachment');

describe("Attachment model", () => {
    afterAll(async () => {
        await db.end();
    });
    it('should get all attachments of an application (by id)', async () => {
        const attachments = await Attachment.getAllByIdApplication(1);
        expect(attachments.length).toBeGreaterThanOrEqual(2);
    });
    it("shouldn't get attachments of an application that doesn't exist (by id)", async () => {
        const attachments = await Attachment.getAllByIdApplication(3432);
        expect(attachments.length).toBe(0);
    });
    it('should get all existing attachments', async () => {
        const attachments = await Attachment.getAll();
        expect(attachments.length).toBeGreaterThanOrEqual(3);
    });
});