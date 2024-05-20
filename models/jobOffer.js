const db = require('./db');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM JobOffer");
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdJobDescription: async (idJobDescription) => {
        try {
            const sql = "SELECT * FROM JobOffer WHERE idjobdescription = ?";
            const [results] = await db.query(sql, [idJobDescription]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdRecruiter: async (idRecruiter) => {
        try {
            const sql = "SELECT * FROM JobOffer WHERE idrecruiter = ?";
            const [results] = await db.query(sql, [idRecruiter]);
            return results;
        } catch (err) {
            throw err;
        }
    },
}
