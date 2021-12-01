const express = require("express");
const passport = require("passport");
const router = express.Router();

//create routes
router.get("/", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs"); //name of view to be loaded
});

router.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
