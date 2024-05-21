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
    getAllByIdRecruiter: async (idRecruiter) => {
        try {
            const sql = "SELECT * FROM JobOffer WHERE idrecruiter = ?";
            const [results] = await db.query(sql, [idRecruiter]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByStatusWithInfo: async (status) => {
        try {
            const sql = ```
            SELECT JO.status AS offerstatus, deadline, indication, numberofattachments, title,
            JD.status AS descriptionstatus, supervisor, type, place, workload, salary, description, O.name 
            FROM JobOffer AS JO
            JOIN JobDescription AS JD
            ON JO.iddescription = JD.id
            JOIN Organisation AS O
            ON JD.idorganisation = O.SIREN
            WHERE offerstatus = ?
            ```
            const [results] = await db.query(sql, [status]);
            return results;
        } catch (err) {
            throw err;
        }
    },
}
