const db = require('./db');

module.exports = {
    getAll: (callback) => {
        db.query("Select * from JobApplication",
            (err, results)=> {
            if (err) throw err;
            callback(results);
        });
    },
    getAllByIdApplicant: (idApplicant, callback) => {
        const sql = "SELECT * FROM JobApplication WHERE idapplicant = ?";
        db.query(sql, [idApplicant], (err, results, fields) => {
            if (err) throw err;
            callback(results);
        });
    }
}