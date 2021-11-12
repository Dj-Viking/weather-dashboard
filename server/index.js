const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
const fetch = require("node-fetch");

const { API_KEY } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//current day api call
app.get("/current", async (req, res) => {
  // console.log("got a request from client", req.query);
  /*`https://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_KEY}&q=`;*/
});
// five day weather forecast call
app.get("/fiveday", async (req, res) => {
  console.log("got a request for fiveday forecast from client", req.query);
   /*`https://api.openweathermap.org/data/2.5/forecast?APPID=${WEATHER_KEY}&q=`;*/
});

app.listen(PORT, () => {
  console.log("\x1b[45m", `listening on PORT ${PORT}`, "\x1b[00m");
});