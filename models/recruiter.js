const db = require("./db");
const { changeStatusRecruiter } = require("./recruiterOrganisation");

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
  create: async (idUser, status) => {
    try {
      const [results] = await db.query(
        "INSERT INTO Recruiter VALUES (NULL, ?, ?)",
        [idUser, status]
      );
    } catch (err) {
      throw err;
    }
  },
  getAllByStatusWithInfo: async (status) => {
    try {
      const sql = `
            SELECT R.id as idrecruiter, iduser, email, lastname, firstname, phonenumber, dateofcreation, U.status as userstatus, R.status as recruiterstatus FROM Recruiter AS R 
            JOIN User AS U on R.iduser = U.id
            WHERE R.status = ?
            `;
      const [results] = await db.query(sql, [status]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  changeStatusRecruiter: async (status, idRecruiter) => {
    try {
      const sql = "UPDATE Recruiter SET status = ? WHERE id = ?";
      await db.query(sql, [status, idRecruiter]);
    } catch (err) {
      throw err;
    }
  },
  changeStatusUser: async (status, idUser) => {
    try {
      const sql = "UPDATE User SET status = ? WHERE id = ?";
      await db.query(sql, [status, idUser]);
    } catch (err) {
      throw err;
    }
  },
};
