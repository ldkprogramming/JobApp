const db = require("../models/db");
const User = require("../models/user");
describe('User model', () => {
    it('should get all users', async () => {
        const users = await User.getAll();
        expect(users.length).toBeGreaterThanOrEqual(3);
    });
    afterAll(async () => {
        await db.end();
    });
    it('should get a user by its email', async () => {
        const user = await User.getByEmail("leonie.biolet@etu.utc.fr");
        expect(user.lastname).toBe("Biolet");
    });
    it("shouldn't get any user that isn't registered (by email)", async () => {
        const user = await User.getByEmail("non.biolet@etu.utc.fr");
        expect(user).toBeNull();
    });
});