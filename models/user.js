const db = require("./db.js");
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
      const [results] = await db.query("SELECT * FROM User WHERE email = ?", [
        email,
      ]);
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  create: async (email, password, lastName, firstName, phoneNumber) => {
    const dateOfCreation = new Date();
    try {
      const [results] = await db.query(
        "INSERT INTO User VALUES (NULL,?,?,?,?,?,?,1)",
        [email, password, lastName, firstName, phoneNumber, dateOfCreation]
      );
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
  },
};
