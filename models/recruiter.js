const db = require("./db");

module.exports = {
    getByEmail: (email, callback) => {
        db.query("select * from User join Recruiter on User.id = Recruiter.id where email= ?",
            [email],
            (err, results, fields) => {
                if (err) throw err;
                callback(results);
        });
    },
    getAll: (callback) => {
        db.query("select * from User join Recruiter on User.id = Recruiter.id",
            (err, results, fields) => {
                if (err) throw err;
                callback(results);
        });
    }
}