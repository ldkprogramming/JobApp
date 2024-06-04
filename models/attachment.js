const db = require("./db");
const { create } = require("./organisation");

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
      const [results] = await db.query(
        "SELECT * FROM Attachment WHERE idapplication = ?",
        [idApplication]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  create: async (idApplication, url) => {
    try {
      const [results] = await db.query(
        "INSERT INTO Attachment VALUES (NULL, ?, ?)",
        [idApplication, url]
      );
      return results.insertId;
    } catch (err) {
      throw err;
    }
  },
};
