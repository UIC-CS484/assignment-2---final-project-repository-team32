var fs = require("fs");
const express = require("express");
const router = express.Router();
const dbService = require("../dbService.js");

const passwordValidator = require("../validator.js");

//create routes
router.get("/", (req, res) => {
  res.render("signup.ejs"); //name of the view index.ejs
});

router.post("/", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  let resultOfValidator = passwordValidator(password);

  if (!resultOfValidator.isValid) {
    res.render("signup.ejs", { error: resultOfValidator.message });
  } else {
    user = {
      name: name,
      email: email,
      password: password,
    };

    const db = dbService.getDbServiceInstance();
    db.createUser(user);

    res.redirect("/login");
  }
});

module.exports = router;
