const db = require("./db");

module.exports = {
  getAll: async () => {
    try {
      const [results] = await db.query("SELECT * FROM JobOffer");
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByIdJobDescription: async (idJobDescription) => {
    try {
      const sql = "SELECT * FROM JobOffer WHERE idjobdescription = ?";
      const [results] = await db.query(sql, [idJobDescription]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByIdRecruiter: async (idRecruiter) => {
    try {
      const sql = "SELECT * FROM JobOffer WHERE idrecruiter = ?";
      const [results] = await db.query(sql, [idRecruiter]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByIdRecruiter: async (idRecruiter) => {
    try {
      const sql = "SELECT * FROM JobOffer WHERE idrecruiter = ?";
      const [results] = await db.query(sql, [idRecruiter]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByStatusWithInfo: async (status) => {
    try {
      const sql = `
            SELECT *
            FROM JobOffer 
            JOIN JobDescription 
            ON JobOffer.idjobdescription = JobDescription.id
            JOIN Organisation 
            ON JobDescription.idorganisation = Organisation.SIREN
            WHERE JobOffer.status = ?
            `;
      const [results] = await db.query(sql, [status]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByStatusByIdRecruiterWithInfo: async (status, idRecruiter) => {
    try {
      const sql = `
            SELECT *
            FROM JobOffer 
            JOIN JobDescription 
            ON JobOffer.idjobdescription = JobDescription.id
            JOIN Organisation 
            ON JobDescription.idorganisation = Organisation.SIREN
            WHERE JobOffer.status = ?
            AND JobOffer.idrecruiter = ?
            `;
      const [results] = await db.query(sql, [status, idRecruiter]);
      return results;
    } catch (err) {
      throw err;
    }
  },
};
