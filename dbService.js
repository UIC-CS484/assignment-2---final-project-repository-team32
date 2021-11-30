var sqlite3 = require("sqlite3").verbose(); //npm install sqlite3
let instance = null;
//const bcrypt = require('bcryptjs');

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database("./weatherappdb.sqlite", (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    //Successful database connection
    console.log("Connected to the SQLite database.");
  }
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // read from db
  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      console.log("getUserByEmail:", email);

      var sql = "SELECT * FROM USER WHERE email = (?)";
      var params = [email];

      db.all(sql, params, function (err, rows) {
        if (err) {
          throw err;
        } else {
          console.log("DB Read Success:", rows);
          resolve(rows);
        }
      });
    });
  }

  // read from db
  getUserById(id) {
    return new Promise((resolve, reject) => {
      console.log("getUserById:", id);

      var sql = "SELECT * FROM USER WHERE id = (?)";
      var params = [id];

      db.all(sql, params, function (err, rows) {
        if (err) {
          throw err;
        } else {
          console.log("DB Read Success:", rows);
          resolve(rows);
        }
      });
    });
  }

  // insert new user into db
  createUser({ email, name, password }) {
    console.log("createUser:", user);
    var sql = "INSERT INTO USER (id,email,name,password) VALUES (?,?,?,?)";
    var params = [null, email, name, password];

    db.all(sql, params, function (err, rows) {
      if (err) {
        console.log("DB ERROR:", err);
        return console.log(err.message);
      } else {
        console.log("DB INSERT Success:", this.changes);
      }
    });
  }
}

module.exports = DbService;
