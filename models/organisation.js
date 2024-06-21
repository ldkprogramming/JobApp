const db = require("./db");
const { getAllByStatus } = require("./recruiterOrganisation");

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
  getAllLikeSiren: async (siren) => {
    try {
      const sql = "SELECT * FROM Organisation WHERE SIREN LIKE CONCAT(?,'%')";
      const [results] = await db.query(sql, [siren]);
      return results
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
      const [results] = await db.query(
        `
        SELECT O.SIREN, O.name, O.type, O.headquarters, O.status
        FROM Organisation AS O
        JOIN RecruiterOrganisation AS RO
        ON O.SIREN = RO.idorganisation
        WHERE RO.idrecruiter = ?
        AND RO.status = 'accepted'
        `,
        [idRecruiter]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  getSIRENAndNameByNotIdRecruiterAndStatus: async (idRecruiter, status) => {
    try {
      const [results] = await db.query(
        `
        SELECT * FROM Organisation 
        WHERE Organisation.status = ?
        AND Organisation.SIREN NOT IN 
        (SELECT RecruiterOrganisation.idorganisation 
        FROM RecruiterOrganisation 
        WHERE RecruiterOrganisation.idrecruiter = ?)`,
        [status, idRecruiter]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllExceptOnHold: async () => {
    try {
      const [results] = await db.query(
        "SELECT * FROM Organisation WHERE status != 'onhold'"
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllLikeNameOrSirenExceptOnhold: async (search) => {
    try {
      const sql = `
      SELECT * FROM Organisation 
      WHERE status != 'onhold'
      AND ((SIREN LIKE CONCAT(?,'%')) OR (name LIKE CONCAT(?,'%')))
      `
      const [results] = await db.query(sql, [search, search]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  delete: async (siren) => {
    try {
      const sql = `DELETE FROM Organisation WHERE SIREN = ?`
      await db.query(sql, [siren]);
    } catch (err) {
      throw err;
    }
  }
};
