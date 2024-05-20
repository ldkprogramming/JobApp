const db = require('./db');

module.exports = {
    getAll: (callback) => {
        db.query("SELECT * FROM RecruiterOrganisation",
            (err, results, fields) => {
                if (err) throw err;
                callback(results);
            });
    },
    getAllByIdRecruiter: (idRecruiter, callback) => {
        const sql = "SELECT * FROM RecruiterOrganisation WHERE idrecruiter = ?";
        db.query(sql,
            [idRecruiter],
            (err, results, fields)=> {
                if (err) throw err;
                callback(results);
            })
    },
    getAllByIdOrganisation: (idOrganisation, callback) => {
        const sql = "SELECT * FROM RecruiterOrganisation WHERE idorganisation = ?";
        db.query(sql,
            [idOrganisation],
            (err, results, fields)=> {
                if (err) throw err;
                callback(results);
            })
    },
}