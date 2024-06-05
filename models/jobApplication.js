const db = require("./db");

module.exports = {
  getAll: async () => {
    try {
      const [results] = await db.query("SELECT * FROM JobApplication");
      return results;
    } catch (err) {
      throw err;
    }
  },
  getNameAndTitleAndDescription: async () => {
    try {
      const [results] = await db.query(
        "SELECT DISTINCT title, description, name FROM JobApplication JOIN JobOffer on JobApplication.offer = JobOffer.id JOIN JobDescription on JobOffer.idjobdescription = JobDescription.id JOIN Organisation on JobDescription.idorganisation = Organisation.SIREN"
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
  getNameAndTitleAndDescriptionByIdApplicant: async (idApplicant) => {
    try {
      const [results] = await db.query(
        "SELECT title,name,description,JobApplication.id as jaid FROM JobApplication JOIN JobOffer on JobApplication.offer = JobOffer.id JOIN JobDescription on JobOffer.idjobdescription = JobDescription.id JOIN Organisation on JobDescription.idorganisation = Organisation.SIREN WHERE JobApplication.idapplicant = ?",
        [idApplicant]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },

  getAllByIdApplicant: async (idApplicant) => {
    try {
      const sql = "SELECT * FROM JobApplication WHERE idapplicant = ?";
      const [results] = await db.query(sql, [idApplicant]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  create: async (idApplicant, idJobOffer) => {
    try {
      const date = new Date();
      const [results] = await db.query(
        "INSERT INTO JobApplication VALUES (NULL, ?, ?, ?)",
        [date, idApplicant, idJobOffer]
      );
    } catch (err) {
      throw err;
    }
  },
  getIdByApplicantAndJobOffer: async (idApplicant, idJobOffer) => {
    try {
      const sql =
        "SELECT id FROM JobApplication WHERE idapplicant = ? AND offer = ?";
      const [results] = await db.query(sql, [idApplicant, idJobOffer]);
      return results[0].id;
    } catch (err) {
      throw err;
    }
  },
};
