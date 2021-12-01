const express = require("express");
const router = express.Router();

//create routes
router.get("/", (req, res) => {
  //   console.log(req);
  res.render("index.ejs", { name: req.user?.name, data: "chicago" }); //name of the view index.ejs
});

// router.delete("/logout", (req, res) => {
//   req.logOut();
//   res.redirect("/");
// });

module.exports = router;
