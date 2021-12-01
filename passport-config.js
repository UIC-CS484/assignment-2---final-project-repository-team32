const LocalStrategy = require("passport-local").Strategy;
let users = require("./users.json");
const dbService = require("./dbService.js");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    console.log("got:", user, user.id);

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("---login success");
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await getUserById(id);
      if (!user) {
        done(new Error("deserializeUser: user not found"));
      } else {
        done(null, user);
      }
    } catch (e) {
      done(e);
    }
  });
}

async function getUserByEmail(email) {
  const db = dbService.getDbServiceInstance();
  let users = await db.getUserByEmail(email);

  // console.log("users:", users);

  if (users.length === 0) {
    return null;
  } else {
    return users[0];
  }
}

async function getUserById(id) {
  // return users.find((user) => user.id === id);

  const db = dbService.getDbServiceInstance();
  let users = await db.getUserById(id);

  // console.log("users:", users);

  if (users.length === 0) {
    return null;
  } else {
    return users[0];
  }
}

module.exports = initialize;
