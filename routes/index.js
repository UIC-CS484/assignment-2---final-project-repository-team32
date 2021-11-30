const express = require("express");
const router = express.Router();

//create routes
router.get("/", (req, res) => {
  res.render("index.ejs", { name: req.user.name }); //name of the view index.ejs
});

module.exports = router;
