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
  delete: async (id) => {
    try {
      const sql = `DELETE FROM Recruiter WHERE id=?`
      await db.query(sql, [id]);
    } catch (err) {
      throw err;
    }
  },
  getAllJoining: async () => {
    try {
      const sql = `
     SELECT 
          r.id,
          r.status,
          u.email,
          u.id AS iduser,
          u.lastname,
          u.firstname,
          u.phonenumber,
          o.SIREN,
          o.name
      FROM 
          Recruiter r
      JOIN 
          RecruiterOrganisation ro ON r.id = ro.idrecruiter
      JOIN 
          Organisation o ON ro.idorganisation = o.SIREN
      JOIN 
          User u ON r.iduser = u.id
      WHERE 
          ro.status = 'onhold'
          AND o.status = 'accepted';
      `
      const [results] = await db.query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getIdUserById: async (id) => {
    try {
      const sql = `
      SELECT iduser FROM Recruiter WHERE id = ?
      `
      const [results] = await db.query(sql, [id]);
      if (results.length > 0) {
        return results[0].iduser;
      } else {
        return null;
      }

    } catch(err) {
      throw err;
    }
  }
};
