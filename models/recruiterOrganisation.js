const db = require('./db');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM RecruiterOrganisation");
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdRecruiter: async (idRecruiter) => {
        try {
            const sql = "SELECT * FROM RecruiterOrganisation WHERE idrecruiter = ?";
            const [results] = await db.query(sql, [idRecruiter]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdOrganisation: async (idOrganisation) => {
        try {
            const sql = "SELECT * FROM RecruiterOrganisation WHERE idorganisation = ?";
            const [results] = await db.query(sql, [idOrganisation]);
            return results;
        } catch (err) {
            throw err;
        }
    },
}
