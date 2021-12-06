const express = require("express");
const router = express.Router();
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

//create routes
router.get("/", (req, res) => {
  //   console.log(req);
  getWeatherData().then((data) => {
    res.render("index.ejs", { name: req.user?.name, weatherData: data });
  });
});

function getWeatherData() {
  let appId = process.env.APIKEY;
  let units = "imperial"; // other option is metric
  let searchMethod = "q";

  let searchTerm = "chicago";

  return axios
    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=41.881832&lon=-87.623177&exclude=minutely,daily,alerts&units=imperial&appid=${process.env.APIKEY}`)
    .then((result) => processData(result));
}

function processData(result) {

  // console.log(result.data.hourly);
  console.log(result.data.hourly.map(({ temp }) => temp));
  let data = result.data.hourly.slice(0,7).map(({ temp }) => temp);

  return data;
}

module.exports = router;
