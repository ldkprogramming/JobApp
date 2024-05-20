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
    }

}