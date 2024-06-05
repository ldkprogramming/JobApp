const db = require("./db");

module.exports = {
  getByEmail: async (email) => {
    try {
      const sql =
        "SELECT * FROM User join Recruiter on User.id = Recruiter.iduser where email= ?";
      const [results] = await db.query(sql, [email]);

      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  getAll: async () => {
    try {
      const sql =
        "select * from User join Recruiter on User.id = Recruiter.iduser";
      const [results] = await db.query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getIdByIdUser: async (idUser) => {
    try {
      const sql = `SELECT Recruiter.id FROM Recruiter JOIN User on Recruiter.iduser = User.id WHERE User.id = ?`;
      const [results] = await db.query(sql, [idUser]);
      if (results.length > 0) {
        return results[0].id;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  create: async (idUser) => {
    const dateOfCreation = new Date();
    try {
      const [results] = await db.query(
        "INSERT INTO Recruiter VALUES (NULL,?,0)",
        [idUser]
      );
    } catch (err) {
      throw err;
    }
  },
};
