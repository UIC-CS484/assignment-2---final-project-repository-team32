var fs = require("fs");
const express = require("express");
const router = express.Router();
const dbService = require("../dbService.js");
const bcrypt = require("bcrypt");

const passwordValidator = require("../validator.js");

//create routes
router.get("/", checkNotAuthenticated, async (req, res) => {
  res.render("signup.ejs"); //name of the view index.ejs
});

router.post("/", checkNotAuthenticated, async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  let resultOfValidator = passwordValidator(password);
  if (!resultOfValidator.isValid) {
    res.render("signup.ejs", { error: resultOfValidator.message });
  } else {
    try {
      var hashedPassword = await bcrypt.hash(password, 10);
      user = {
        name: name,
        email: email,
        password: hashedPassword,
      };

      const db = dbService.getDbServiceInstance();
      db.createUser(user);

      console.log("---signup success");

      res.redirect("/login");
    } catch {
      res.render("signup.ejs", { error: "failure in hashing: retry" });
    }
  }
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
