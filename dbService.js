var sqlite3 = require("sqlite3").verbose(); //npm install sqlite3
let instance = null;
//const bcrypt = require('bcryptjs');

//Creating a new database instance - Indication of connected database
//Before performing any operations to database, make sure database is connected.
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
          console.log("DB Read Success");
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
          console.log("DB Read Success");
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
        console.log("DB INSERT Success");
      }
    });
  }

  // update name
  updateName(newName, oldName, id) {
    return new Promise((resolve, reject) => {
      console.log("--db updateName:", newName, oldName, id);
      var sql = "UPDATE USER SET name=? WHERE id=?";
      var params = [newName, id];

      db.run(sql, params, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("DB UPDATE Success");
        console.log(`changes: ${this.changes}`);
        resolve();
      });
    });
  }

  // update city
  updateCity(newCity, newCountry, id) {
    return new Promise((resolve, reject) => {
      console.log("--db updateCity:", newCity, newCountry, id);
      var sql = "UPDATE USER SET address=LOC.id FROM (SELECT id FROM LOCATION WHERE city=? AND country=?) AS LOC WHERE USER.id=?;";
      var params = [newCity,newCountry,id];

      db.run(sql, params, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("DB UPDATE Success");
        console.log(`changes: ${this.changes}`);
        resolve();
      });
    });
  }

  // delete account
  deleteAccount(id) {
    var sql = "DELETE FROM USER WHERE id=?";
    var params = [id];

    db.run(sql, params, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("DB DELETE Success");
      console.log(`changes: ${this.changes}`);
    });
  }

  // get city
  getCity(id) {
    return new Promise((resolve, reject) => {
      console.log("--db getCity:", id);
      var sql = "SELECT city,country FROM (SELECT * FROM USER WHERE USER.id=?) AS USERX JOIN LOCATION ON USERX.address=LOCATION.id;";
      var params = [id];

      db.all(sql, params, function (err,rows) {
        if (err) {
          return console.log(err);
        }
        console.log("DB getCity Success");
        resolve(rows);
      });
    });
  }
}

module.exports = DbService;
