const db = require('./db');

module.exports = {
    getByEmail: async (email) => {
        try {
            const sql = "SELECT * FROM User JOIN Admin ON User.id = Admin.id WHERE email = ?";
            const [results] = await db.query(sql, [email]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAll: async () => {
        try {
            const sql = "SELECT * FROM User JOIN Admin ON User.id = Admin.id";
            const [results] = await db.query(sql);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
