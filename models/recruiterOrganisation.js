const db = require("./db");

module.exports = {
  getAll: async () => {
    try {
      const [results] = await db.query("SELECT * FROM RecruiterOrganisation");
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByIdUser: async (idUser) => {
    try {
      const sql =
        "SELECT * FROM RecruiterOrganisation WHERE idrecruiter = (SELECT id FROM Recruiter WHERE iduser = ?) AND status != 'rejected'";
      const [results] = await db.query(sql, [idUser]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByIdRecruiter: async (idRecruiter) => {
    try {
      const sql = "SELECT * FROM RecruiterOrganisation WHERE idrecruiter = ?";
      const [results] = await db.query(sql, [idRecruiter]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByIdOrganisation: async (idOrganisation) => {
    try {
      const sql =
        "SELECT * FROM RecruiterOrganisation WHERE idorganisation = ?";
      const [results] = await db.query(sql, [idOrganisation]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByStatus: async (status) => {
    try {
      const sql = "SELECT * FROM RecruiterOrganisation WHERE status = ?";
      const [results] = await db.query(sql, [status]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByStatusWithInfo: async (status) => {
    try {
      const sql = `
            SELECT * FROM RecruiterOrganisation AS RO 
            JOIN Recruiter AS R on RO.idrecruiter = R.id
            JOIN Organisation AS O on RO.idorganisation = O.SIREN
            JOIN User AS U on U.id = R.iduser
            WHERE RO.status = ?
            `;
      const [results] = await db.query(sql, [status]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  create: async (status, idRecruiter, siren) => {
    try {
      const [results] = await db.query(
        "INSERT INTO RecruiterOrganisation VALUES (?, ?, ?)",
        [status, idRecruiter, siren]
      );
    } catch (err) {
      throw err;
    }
  },
  createByIdUser: async (status, idUser, siren) => {
    try {
      const [results] = await db.query(
        "INSERT INTO RecruiterOrganisation VALUES (?, (SELECT id FROM Recruiter WHERE iduser = ? AND status != 'rejected'), ?)",
        [status, idUser, siren]
      );
    } catch (err) {
      throw err;
    }
  },
  changeStatusRecruiter: async (status, id, SIREN) => {
    try {
      const [results] = await db.query(
        "UPDATE RecruiterOrganisation SET status = ? WHERE idrecruiter = ? AND idorganisation = ?",
        [status, id, SIREN]
      );
    } catch (err) {
      throw err;
    }
  },
  changeStatusByRecruiter: async (status, idRecruiter) => {
    try {
      const [results] = await db.query(
        "UPDATE RecruiterOrganisation SET status = ? WHERE idrecruiter = ?",
        [status, idRecruiter]
      );
    } catch (err) {
      throw err;
    }
  },
  deleteByIdOrganisation: async (idOrganisation) => {
    try {
      const sql = `
      DELETE FROM RecruiterOrganisation
      WHERE idorganisation = ?
      `
      await db.query(sql, [idOrganisation])
    } catch (err) {
      throw err;
    }
  },
  deleteByIdOrganisationAndIdRecruiter: async (idOrganisation, idRecruiter) => {
    try {
      const sql = `
      DELETE FROM RecruiterOrganisation
      WHERE idorganisation = ? AND idrecruiter = ?
      `
      await db.query(sql, [idOrganisation, idRecruiter])
    } catch (err) {
      throw err;
    }
  },
  getAllByIdRecruiterAccepted: async (idRecruiter) => {
    try {
      const sql = "SELECT * FROM RecruiterOrganisation WHERE idrecruiter = ? AND status = 'accepted'";
      const [results] = await db.query(sql, [idRecruiter]);
      return results;
    } catch (err) {
      throw err;
    }
  },
};
