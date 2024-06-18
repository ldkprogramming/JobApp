const db = require("./db");
module.exports = {
    create: async (siren, name, type, headquarters) => {
        try {
            const sql = `Insert into RejectedOrganisation VALUES (NULL, ?, ?, ?, ?, 'rejected')`;
            await db.query(sql, [siren, name, type, headquarters]);
        } catch (err) {
            throw err;
        }
    },
    getAllLikeNameOrSirenExceptOnhold: async (search) => {
        try {
            const sql = `
      SELECT * FROM RejectedOrganisation 
      WHERE status != 'onhold'
      AND ((SIREN LIKE CONCAT(?,'%')) OR (name LIKE CONCAT(?,'%')))
      `
            const [results] = await db.query(sql, [search, search]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllExceptOnHold: async () => {
        try {
            const [results] = await db.query(
                "SELECT * FROM RejectedOrganisation WHERE status != 'onhold'"
            );
            return results;
        } catch (err) {
            throw err;
        }
    }
}