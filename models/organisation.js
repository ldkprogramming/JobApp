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
    },
    getAllByStatus: async (status) => {
        try {
            const [results] = await db.query("SELECT * FROM Organisation WHERE status = ?", [status]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    create: async(siren, name, type, headquarters, status) => {
        try {
            const [results] = await db.query(
                "INSERT INTO Organisation VALUES (?, ?, ?, ?, ?)",
                [siren, name, type, headquarters, status]
            );
        } catch (err) {
            throw err;
        }
    }
}
