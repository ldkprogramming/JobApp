const db = require('./db');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM AdminOrganisation");
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdAdmin: async (idAdmin) => {
        try {
            const sql = "SELECT * FROM AdminOrganisation WHERE idadmin = ?";
            const [results] = await db.query(sql, [idAdmin]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdOrganisation: async (idOrganisation) => {
        try {
            const sql = "SELECT * FROM AdminOrganisation WHERE idOrganisation = ?";
            const [results] = await db.query(sql, [idOrganisation]);
            return results;
        } catch (err) {
            throw err;
        }
    }
}
