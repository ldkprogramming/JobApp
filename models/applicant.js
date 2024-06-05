const db = require('./db');

module.exports = {
    getByEmail: async (email) => {
        try {
            const sql = "SELECT * FROM User JOIN Applicant ON User.id = Applicant.iduser WHERE email = ?";
            const [results] = await db.query(sql, [email]);

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
            const sql = "SELECT * FROM User JOIN Applicant ON User.id = Applicant.id";
            const [results] = await db.query(sql);
            return results;
        } catch (err) {
            throw err;
        }
    },
    getIdByIdUser: async (idUser) => {
        try {
            const sql = `SELECT Applicant.id FROM Applicant JOIN User on Applicant.iduser = User.id WHERE User.id = ?`
            const [results] = await db.query(sql, [idUser]);
            if (results.length > 0) {
                return results[0].id;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    },
    create : async (idUser) => {
        try {
            const sql = 'INSERT INTO Applicant VALUES (NULL, ?)';
            await db.query(sql, [idUser]);
        } catch (err) {
            throw err;
        }
    }
}
