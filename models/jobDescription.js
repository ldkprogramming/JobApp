const db = require('./db');
module.exports = {
    getAll: (callback) => {
        db.query("select * from JobDescription",
            (err, results, fields) => {
                if (err) throw err;
                callback(results);
        });
    }
}