const db = require("./db");

module.exports = {
  getAll: async () => {
    try {
      const [results] = await db.query("SELECT * FROM JobDescription");
      return results;
    } catch (err) {
      throw err;
    }
  },
  create: async (
    title,
    status,
    supervisor,
    type,
    place,
    workload,
    salary,
    description,
    siren
  ) => {
    try {
      const [results] = await db.query(
        "INSERT INTO JobDescription VALUES (NULL,?,?,?,?,?,?,?,?,?)",
        [
          title,
          status,
          supervisor,
          type,
          place,
          workload,
          salary,
          description,
          siren,
        ]
      );
    } catch (err) {
      throw err;
    }
  },
    getAllByIdOrganisation: async (idOrganisation) => {
      try {
          const sql = `
      SELECT * FROM JobDescription
      WHERE idorganisation = ? 
      `;
          const [results] = await db.query(sql, [idOrganisation]);
          return results;
      } catch (err) {
          throw err;
      }

    }
};
