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
      const date = new Date();
      const sql = `
            SELECT JobOffer.id, JobDescription.title, JobOffer.deadline,
            Organisation.name, JobDescription.description,
            JobDescription.salary, JobDescription.workload, JobDescription.place,
            JobDescription.supervisor, JobOffer.numberofattachments
            FROM JobOffer
            JOIN JobDescription
            ON JobOffer.idjobdescription = JobDescription.id
            JOIN Organisation 
            ON JobDescription.idorganisation = Organisation.SIREN
            WHERE JobOffer.status = ? AND JobOffer.deadline > ?
            `;
      const [results] = await db.query(sql, [status, date]);
      return results;
    } catch (err) {
      throw err;
    }
  },
  getAllByStatusByIdRecruiterWithInfo: async (status, idRecruiter) => {
    try {
      const sql = `
            SELECT 
            JobOffer.id,
            JobDescription.title,
            JobOffer.status as jobOfferStatus,
            JobDescription.description,
            JobOffer.deadline,
            Organisation.name as organisationName
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
  create: async (
    status,
    deadline,
    indication,
    numberOfAttachments,
    idJobDescription,
    idRecruiter
  ) => {
    try {
      const sql = `INSERT INTO JobOffer VALUES (NULL, ?, ?, ?, ?, ?, ?)`;
      await db.query(sql, [
        status,
        deadline,
        indication,
        numberOfAttachments,
        idJobDescription,
        idRecruiter,
      ]);
    } catch (err) {
      throw err;
    }
  },
  get: async (id) => {
    try {
      const sql = `SELECT * FROM JobOffer WHERE id = ?`;
      const [results] = await db.query(sql, [id]);
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  getWithInfo: async (id) => {
    try {
      const sql = `
        SELECT JO.status, JO.deadline, JO.indication,
        JD.title,
        O.name
        FROM JobOffer as JO
        JOIN JobDescription AS JD 
        ON JO.idjobdescription = JD.id
        JOIN Organisation as O
        ON O.SIREN = JD.idorganisation
        WHERE JO.id = ?
        `;
      const [results] = await db.query(sql, [id]);
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  getAllLikeNameOrTitle: async (status, search) => {
    try {
      const date = new Date();
      const sql = `
      SELECT JobOffer.id, JobDescription.title, JobOffer.deadline,
          Organisation.name, JobDescription.description,
          JobDescription.salary, JobDescription.workload, JobDescription.place,
          JobDescription.supervisor, JobOffer.numberofattachments
      FROM JobOffer
      JOIN JobDescription
      ON JobOffer.idjobdescription = JobDescription.id
      JOIN Organisation
      ON JobDescription.idorganisation = Organisation.SIREN
      WHERE JobOffer.status = ? AND JobOffer.deadline > ? AND ((JobDescription.title LIKE CONCAT(?,'%')) OR (Organisation.name LIKE CONCAT(?,'%')))
      ;
      `

      const [results] = await db.query(sql, [status, date, search, search]);
      return results;
    } catch (err) {
      throw err;
    }
  },

};
