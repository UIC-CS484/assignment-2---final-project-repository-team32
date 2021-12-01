const express = require("express");
const router = express.Router();
const axios = require("axios");

//create routes
router.get("/", (req, res) => {
  //   console.log(req);
  getWeatherData().then((data) => {
    res.render("index.ejs", { name: req.user?.name, data: "chicago " + data });
  });
});

function getWeatherData() {
  let appId = process.env.APIKEY;
  let units = "imperial"; // other option is metric
  let searchMethod = "q";

  let searchTerm = "chicago";

  return axios
    .get(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then((result) => result.data.weather[0].description);
}

module.exports = router;
