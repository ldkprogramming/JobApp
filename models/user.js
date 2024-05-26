const db = require("./db.js");
module.exports = {
  // getAll: (callback) => {
  //     db.query("SELECT * FROM User",
  //         (err, results, fields) => {
  //         if (err) throw err;
  //         callback(results);
  //         })
  // }
  getAll: async () => {
    try {
      const [results] = await db.query("SELECT * FROM User");
      return results;
    } catch (err) {
      throw err;
    }
  },
  getByEmail: async (email) => {
    try {
      const [results] = await db.query("SELECT * FROM User WHERE email = ?", [
        email,
      ]);
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  create: async (email, password, lastName, firstName, phoneNumber) => {
    const dateOfCreation = new Date();
    try {
      const [results] = await db.query(
        "INSERT INTO User VALUES (NULL,?,?,?,?,?,?,1)",
        [email, password, lastName, firstName, phoneNumber, dateOfCreation]
      );
    } catch (err) {
      throw err;
    }
  },
  getById: async (id) => {
    try {
      const [results] = await db.query("SELECT * FROM User WHERE id = ?", [id]);
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  getIdByEmail: async(email) => {
    try {
      const [results] = await db.query("SELECT id FROM User WHERE email = ?", [email]);
      if (results.length > 0) {
        return results[0].id;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  getRolesById: async(id) => {
    try {
      const roles = [];
      const [results] = await db.query(`
        SELECT U.id, APP.id AS appid, REC.id AS recid, ADM.id AS admid
        FROM User AS U 
        LEFT JOIN Applicant AS APP ON APP.iduser = U.id
        LEFT JOIN Recruiter AS REC ON REC.iduser = U.id
        LEFT JOIN Admin AS ADM ON ADM.iduser = U.id
        WHERE U.id = ?
      `, [id]);
      if (results.length === 0) {
        return roles;
      }
      if (results[0].appid) {
        roles.push('applicant');
      }
      if (results[0].recid) {
        roles.push('recruiter');
      }
      if (results[0].admid) {
        roles.push('admin');
      }
      return roles;
    } catch (err) {
      throw err;
    }
  },
  getRolesByEmail: async(email) => {
    try {
      const roles = [];
      const [results] = await db.query(`
        SELECT U.id, APP.id AS appid, REC.id AS recid, ADM.id AS admid
        FROM User AS U 
        LEFT JOIN Applicant AS APP ON APP.iduser = U.id
        LEFT JOIN Recruiter AS REC ON REC.iduser = U.id
        LEFT JOIN Admin AS ADM ON ADM.iduser = U.id
        WHERE U.email = ?
      `,[email]);
      if (results.length === 0) {
        return roles;
      }
      if (results[0].appid) {
        roles.push('applicant');
      }
      if (results[0].recid) {
        roles.push('recruiter');
      }
      if (results[0].admid) {
        roles.push('admin');
      }
      return roles;
    } catch (err) {
      throw err;
    }
  },
  getRolesIdMapByEmail: async(email) => {
    try {
      const [results] = await db.query(`
        SELECT U.id, APP.id AS applicantId, REC.id AS recruiterId, ADM.id AS adminId
        FROM User AS U 
        LEFT JOIN Applicant AS APP ON APP.iduser = U.id
        LEFT JOIN Recruiter AS REC ON REC.iduser = U.id
        LEFT JOIN Admin AS ADM ON ADM.iduser = U.id
        WHERE U.email = ?
      `,[email]);

      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  isLoginValid: async (email, pwd) => {
    try {
      const [results] = await db.query(`
        SELECT * FROM User WHERE email = ? AND pwd = ?
      `, [email, pwd])
      return (results.length !== 0);
    } catch (err) {
      throw err;
    }
  }

};
