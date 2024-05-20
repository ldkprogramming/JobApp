const db = require('./db');

module.exports = {
    getBySiren: (siren, callback) => {
        const sql = "SELECT * FROM Organisation WHERE SIREN = ?";
        db.query(sql,
            [siren],
            (err, results, fields) => {
                if (err) throw err;
                callback(results);
            });
    },

    getAll: async () => {
        const [results] = await db.query("SELECT * FROM Organisation");
        return results;
    }
}