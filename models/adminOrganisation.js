const db = require('./db');

module.exports = {
    getAll: (callback) => {
        db.query("select * from AdminOrganisation",
            (err, results, fields) => {
            if (err) throw err;
            callback(results);
        });
    },
    getAllByIdAdmin: (idAdmin, callback) => {
        const sql = "SELECT * FROM AdminOrganisation WHERE idadmin = ?";
        db.query(sql,
            [idAdmin],
            (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },
    getAllByIdOrganisation: (idOrganisation, callback) => {
        const sql = "SELECT * FROM AdminOrganisation WHERE idOrganisation = ?";
        db.query(sql, [idOrganisation], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }

}