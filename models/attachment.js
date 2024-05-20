const db = require('./db');

module.exports = {
    getAll: (callback) => {
        db.query("Select * from Attachment",
            (err, results, fields) => {
            if (err) throw err;
            callback(results);
        });
    }
}