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
        const user = await User.getByEmail("harry.walker@example.com");
        expect(user.lastname).toBe("Walker");
    });
    it("shouldn't get any user that isn't registered (by email)", async () => {
        const user = await User.getByEmail("non.biolet@etu.utc.fr");
        expect(user).toBeNull();
    });
    it('should get all roles of a user (by email)', async () => {
        const roles = await User.getRolesByEmail("harry.walker@example.com");
        expect(roles).toContain('recruiter');
    });
    it("shouldn't get roles of a user that doesn't exist (by email)", async () => {
        const roles = await User.getRolesByEmail("nope@example.com");
        expect(roles.length).toBe(0);
    });
    it('should check credentials', async () => {
        expect(await User.isLoginValid("karlou@gmail.com", "a")).toBeTruthy();
        expect(await User.isLoginValid("harry.walker@example.com", "password010101001")).toBeFalsy();
    });
    it('should get roles and ids for a user (by email)', async () => {
        const map = await User.getRolesIdMapByEmail("harry.walker@example.com");
        console.log(map);
    });
});