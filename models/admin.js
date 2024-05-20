const db = require('./db');

module.exports = {
    getByEmail: async (email) => {
        try {
            const sql = "SELECT * FROM User JOIN Admin ON User.id = Admin.iduser WHERE email = ?";
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
            const sql = "SELECT * FROM User JOIN Admin ON User.id = Admin.iduser";
            const [results] = await db.query(sql);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
