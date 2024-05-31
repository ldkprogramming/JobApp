const db = require("./db");

module.exports = {
  getBySiren: async (siren) => {
    try {
      const sql = "SELECT * FROM Organisation WHERE SIREN = ?";
      const [results] = await db.query(sql, [siren]);
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
      const [results] = await db.query("SELECT * FROM Organisation");
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByStatus: async (status) => {
    try {
      const [results] = await db.query(
        "SELECT * FROM Organisation WHERE status = ?",
        [status]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  create: async (siren, name, type, headquarters, status) => {
    try {
      const [results] = await db.query(
        "INSERT INTO Organisation VALUES (?, ?, ?, ?, ?)",
        [siren, name, type, headquarters, status]
      );
    } catch (err) {
      throw err;
    }
  },
  changeStatus: async (idOrganisation, status) => {
    try {
      const sql = "UPDATE Organisation SET status = ? WHERE SIREN = ?";
      await db.query(sql, [status, idOrganisation]);
    } catch (err) {
      throw err;
    }
  },
    getAllByIdRecruiter: async (idRecruiter) => {
      try {
        const [results] = await db.query(`
        SELECT O.SIREN, O.name, O.type, O.headquarters, O.status
        FROM Organisation AS O
        JOIN RecruiterOrganisation AS RO
        ON O.SIREN = RO.idorganisation
        WHERE RO.idrecruiter = ?
        AND RO.status = 'accepted'
        `, [idRecruiter]);
        return results;
      } catch (err) {
        throw err;
      }
    }
};
