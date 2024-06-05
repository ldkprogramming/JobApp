const db = require("./db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
      const [results] = await db.query(
        "SELECT User.id as userid, Admin.id as adminid, Admin.iduser, email, pwd, lastname, firstname, phonenumber, dateofcreation, status FROM User LEFT JOIN Admin on Admin.iduser = User.id WHERE User.status = 1"
      );
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
  getFirstAndLastName: async () => {
    try {
      const [results] = await db.query(
        "SELECT firstname, lastname FROM User WHERE status = 1"
      );
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
  getIdByEmail: async (email) => {
    try {
      const [results] = await db.query("SELECT id FROM User WHERE email = ?", [
        email,
      ]);
      if (results.length > 0) {
        return results[0].id;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
  getRolesById: async (id) => {
    try {
      const roles = [];
      const [results] = await db.query(
        `
        SELECT U.id, APP.id AS appid, REC.id AS recid, ADM.id AS admid
        FROM User AS U 
        LEFT JOIN Applicant AS APP ON APP.iduser = U.id
        LEFT JOIN Recruiter AS REC ON REC.iduser = U.id
        LEFT JOIN Admin AS ADM ON ADM.iduser = U.id
        WHERE U.id = ?
      `,
        [id]
      );
      if (results.length === 0) {
        return roles;
      }
      if (results[0].appid) {
        roles.push("applicant");
      }
      if (results[0].recid) {
        roles.push("recruiter");
      }
      if (results[0].admid) {
        roles.push("admin");
      }
      return roles;
    } catch (err) {
      throw err;
    }
  },
  getRolesByEmail: async (email) => {
    try {
      const roles = [];
      const [results] = await db.query(
        `
        SELECT U.id, APP.id AS appid, REC.id AS recid, ADM.id AS admid
        FROM User AS U 
        LEFT JOIN Applicant AS APP ON APP.iduser = U.id
        LEFT JOIN Recruiter AS REC ON REC.iduser = U.id
        LEFT JOIN Admin AS ADM ON ADM.iduser = U.id
        WHERE U.email = ?
      `,
        [email]
      );
      if (results.length === 0) {
        return roles;
      }
      if (results[0].appid) {
        roles.push("applicant");
      }
      if (results[0].recid) {
        roles.push("recruiter");
      }
      if (results[0].admid) {
        roles.push("admin");
      }
      return roles;
    } catch (err) {
      throw err;
    }
  },
  getRolesIdMapByEmail: async (email) => {
    try {
      const [results] = await db.query(
        `
        SELECT U.id, APP.id AS applicantId, REC.id AS recruiterId, ADM.id AS adminId
        FROM User AS U 
        LEFT JOIN Applicant AS APP ON APP.iduser = U.id
        LEFT JOIN Recruiter AS REC ON (REC.iduser = U.id AND REC.status = 1)
        LEFT JOIN Admin AS ADM ON ADM.iduser = U.id
        WHERE U.email = ?
      `,
        [email]
      );

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
      const [results] = await db.query(
        `
        SELECT * FROM User WHERE email = ?
      `,
        [email]
      );
      if (results.length === 0) {
        return false;
      }
      const match = await bcrypt.compare(pwd, results[0].pwd);
      return match;
    } catch (err) {
      throw err;
    }
  },
  isAdmin: async (email, lastname, firstname) => {
    try {
      const [results] = await db.query(
        `
        SELECT Admin.id FROM Admin JOIN User on User.id = Admin.iduser WHERE lastname = ? AND firstname = ? 
      `,
        [lastname, firstname]
      );
      return results.length !== 0;
    } catch (err) {
      throw err;
    }
  },
  giveAdminRight: async (iduser) => {
    try {
      const [results] = await db.query("INSERT INTO Admin VALUES (NULL, ?)", [
        iduser,
      ]);
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (iduser) => {
    try {
      const [results] = await db.query(
        "UPDATE User SET status = 0 WHERE id = ?",
        [iduser]
      );
    } catch (err) {
      throw err;
    }
  },
  getByIdApplicant: async (id) => {
    try {
      const [results] = await db.query(
        "SELECT iduser FROM Applicant WHERE idapplicant = ?",
        [id]
      );
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },
};
