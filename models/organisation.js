const db = require('./db');

module.exports = {
    getBySiren: async (siren) => {
        try {
            const sql = "SELECT * FROM Organisation WHERE SIREN = ?";
            const [results] = await db.query(sql, [siren]);
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
            const [results] = await db.query("SELECT * FROM Organisation");
            return results;
        } catch (err) {
            throw err;
        }
    }
}
