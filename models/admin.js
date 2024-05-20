const db = require('./db');

module.exports = {
    getByEmail : (email, callback) => {
        db.query("select * from User join Admin on User.id = Admin.id where email= ?",
            [email],
            (err, results, fields) => {
                if (err) throw err;
                callback(results);
            });
    },
    getAll : (callback) => {
        db.query("select * from User join Admin on User.id = Admin.id",
             (err, results, fields) => {
            if (err) throw err;
            callback(results);
        });
    }
}