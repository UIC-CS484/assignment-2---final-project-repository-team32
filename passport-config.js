const LocalStrategy = require("passport-local").Strategy;
let users = require("./users.json");
const dbService = require("./dbService.js");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    console.log("got:", user, user.id);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    if (user.password === password) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

async function getUserByEmail(email) {
  const db = dbService.getDbServiceInstance();
  let users = await db.getUserByEmail(email);

  console.log("users:", users);

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

  console.log("users:", users);

  if (users.length === 0) {
    return null;
  } else {
    return users[0];
  }
}

module.exports = initialize;
