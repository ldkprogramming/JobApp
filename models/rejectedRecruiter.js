const db = require("./db");

module.exports = {
    getAllByStatusWithInfo: async (status) => {
        try {
            const sql = `
            SELECT date, iduser, email, lastname, firstname, phonenumber, dateofcreation, U.status as userstatus, RR.status as recruiterstatus FROM RejectedRecruiter AS RR 
            JOIN User AS U on RR.iduser = U.id
            WHERE RR.status = ?
            `;
            const [results] = await db.query(sql, [status]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllLikeLastnameOrFirstname: async (search) => {
        try {
            const sql = `
      SELECT date, iduser, email, lastname, firstname, phonenumber, dateofcreation, U.status as userstatus, RR.status as recruiterstatus FROM RejectedRecruiter AS RR 
      JOIN User AS U on RR.iduser = U.id
      WHERE RR.status = "rejected" AND ((firstname LIKE CONCAT(?,'%')) OR (lastname LIKE CONCAT(?,'%')))
      `;
            const [results] = await db.query(sql, [search, search]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    create : async (idUser, date) => {
        try {
            const sql = `INSERT INTO RejectedRecruiter VALUES (NULL, ?, ?, 'rejected')`
            await db.query(sql, [idUser, date]);
        } catch (e) {
            throw e;
        }
    }

}