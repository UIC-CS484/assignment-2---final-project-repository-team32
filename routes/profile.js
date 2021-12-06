const express = require("express");
const router = express.Router();
const dbService = require("../dbService.js");

//create routes
router.get("/", checkAuthenticated, async (req, res) => {
  console.log("--profile: user:", req.user);

  req.user.address = await getCity(req.user.id);
  console.log("addr:",req.user.address);

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

router.post("/changeCity", checkAuthenticated, async (req, res) => {
  console.log("--changeCity:", req.body.newCity);

  await updateCity(req.body.newCity, 'us', req.user.id);

  console.log("--rendering anew");
  res.redirect("/profile");
});

async function updateName(newName, oldName, id) {
  const db = dbService.getDbServiceInstance();
  await db.updateName(newName, oldName, id);
}

async function updateCity(newCity, oldCity, id) {
  const db = dbService.getDbServiceInstance();
  await db.updateCity(newCity, oldCity, id);
}

async function getCity(id) {
  const db = dbService.getDbServiceInstance();
  let city = await db.getCity(id);
  console.log("getCity:",id,city);
  
  if(city[0]) {
    city = city[0].city+','+city[0].country
  } else {
    city = 'no city selected'
  }

  return city;
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
