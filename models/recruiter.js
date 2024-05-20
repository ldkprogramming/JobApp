const db = require("./db");

module.exports = {
    getByEmail: async (email) => {
        try {
            const sql = "select * from User join Recruiter on User.id = Recruiter.id where email= ?";
            const [results] = await db.query(sql, [email]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAll: async () => {
        try {
            const sql = "select * from User join Recruiter on User.id = Recruiter.id";
            const [results] = await db.query(sql);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
