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
    idorganisation
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
          idorganisation,
        ]
      );
    } catch (err) {
      throw err;
    }
  },
};
