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
    getAllByStatus: async (status) => {
        try {
            const sql = "SELECT * FROM RecruiterOrganisation WHERE status = ?";
            const [results] = await db.query(sql, [status]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByStatusWithInfo: async (status) => {
        try {
            const sql = `
            SELECT * FROM RecruiterOrganisation AS RO 
            JOIN Recruiter AS R on RO.idrecruiter = R.id
            JOIN Organisation AS O on RO.idorganisation = O.SIREN
            JOIN User AS U on U.id = R.iduser
            WHERE RO.status = ?
            `;
            const [results] = await db.query(sql, [status]);
            return results;
        } catch (err) {
            throw err;
        }
    },
}
