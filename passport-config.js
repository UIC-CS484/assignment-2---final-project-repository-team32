const LocalStrategy = require('passport-local').Strategy
let users = require('./users.json');

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    if (user.password === password) {
        return done(null, user)
    } else {
        return done(null, false, { message: 'Password incorrect' })
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

module.exports = initialize