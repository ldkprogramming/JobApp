const db = require('./db');
module.exports = {
    // getAll: (callback) => {
    //     db.query("SELECT * FROM User",
    //         (err, results, fields) => {
    //         if (err) throw err;
    //         callback(results);
    //         })
    // }
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM User");
            return results;
        } catch (err) {
            throw err;
        }
    },
    getByEmail: async (email) => {
        try {
            const [results] = await db.query("SELECT * FROM User WHERE email = ?", [email]);
            if (results.length > 0) {
                return results[0];
            } else {
                return null;
            }

        } catch (err) {
            throw err;
        }
    },
    getById: async (id) => {
        try {
            const [results] = await db.query("SELECT * FROM User WHERE id = ?", [id]);
            if (results.length > 0) {
                return results[0];
            } else {
                return null;
            }

        } catch (err) {
            throw err;
        }
    }

}