const db = require('./db');

module.exports = {
    getByEmail: async (email) => {
        try {
            const sql = "SELECT * FROM User JOIN Applicant ON User.id = Applicant.id WHERE email = ?";
            const [results] = await db.query(sql, [email]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAll: async () => {
        try {
            const sql = "SELECT * FROM User JOIN Applicant ON User.id = Applicant.id";
            const [results] = await db.query(sql);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
