const express = require("express");
const router = express.Router();
const dbService = require("../dbService.js");

//create routes
router.get("/", checkAuthenticated, (req, res) => {
  console.log("--profile: user:", req.user);
  res.render("profile.ejs", { user: req.user }); //name of view to be loaded
});

router.delete("/", (req, res) => {
  var id = req.user.id;
  req.logOut();
  deleteAccount(id);
  res.redirect("/");
});

router.post("/changeName", checkAuthenticated, async (req, res) => {
  console.log("--changeName:", req.body.newName);

  await updateName(req.body.newName, req.user.name, req.user.id);

  console.log("--rendering anew");
  res.redirect("/profile");
});

async function updateName(newName, oldName, id) {
  const db = dbService.getDbServiceInstance();
  await db.updateName(newName, oldName, id);
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function deleteAccount(id) {
  const db = dbService.getDbServiceInstance();
  db.deleteAccount(id);
}

module.exports = router;
