const db = require('./db');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM JobDescription");
            return results;
        } catch (err) {
            throw err;
        }
    }
}
