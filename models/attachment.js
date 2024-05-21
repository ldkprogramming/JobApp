const db = require('./db');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM Attachment");
            return results;
        } catch (err) {
            throw err;
        }
    },
    getAllByIdApplication: async (idApplication) => {
        try {
            const [results] = await db.query("SELECT * FROM Attachment WHERE idapplication = ?", [idApplication]);
            return results;
        } catch (err) {
            throw err;
        }
    },

}
