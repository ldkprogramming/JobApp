const db = require('./db');

module.exports = {
    getAll: (callback) => {
        db.query("select * from JobOffer",
             (err, results, fields) => {
            if (err) throw err;
            callback(results);
        });
    },
    getAllByIdJobDescription: (idJobDescription, callback) => {
        const sql = "SELECT * FROM JobOffer WHERE idjobdescription = ?";
        db.query(sql,
            idJobDescription,
            (err, results) => {
                if (err) throw err;
                callback(results)
        });
    },
    getAllByIdRecruiter: function (idRecruiter, callback) {
        const sql = "SELECT * FROM JobOffer WHERE idrecruiter = ?";
        db.query(sql,
            idRecruiter,
            (err, results) => {
                if (err) throw err;
                callback(results)
        });
    },
}