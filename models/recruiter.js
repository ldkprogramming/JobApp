const db = require("./db");

module.exports = {
    getByEmail: async (email) => {
        try {
            const sql = "SELECT * FROM User join Recruiter on User.id = Recruiter.iduser where email= ?";
            const [results] = await db.query(sql, [email]);

            if (results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    },
    getAll: async () => {
        try {
            const sql = "select * from User join Recruiter on User.id = Recruiter.iduser";
            const [results] = await db.query(sql);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
