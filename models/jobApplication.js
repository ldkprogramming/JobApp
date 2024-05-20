const db = require('./db');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM JobApplication");
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdApplicant: async (idApplicant) => {
        try {
            const sql = "SELECT * FROM JobApplication WHERE idapplicant = ?";
            const [results] = await db.query(sql, [idApplicant]);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
