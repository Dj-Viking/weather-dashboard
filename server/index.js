const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const fetch = require("node-fetch");

const { API_KEY } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//current day api call
app.get("/current", async (req, res) => {
  if (!req.query.q) {
    return res.status(422).json({ error: "Error! missing q query parameter!" });
  }

  /**
   * @type {string | void} city name that was sent from the client 
   */
  const cityQuery = req.query.q;
  console.log("what is api key here", API_KEY);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${API_KEY}`;

  console.log("what is the url here", url);

  try {
    const response = await fetch(url);
  /**
   * @type {{
   *   coord: { 
   *     lon: number;
   *     lat: number;
   *   };
   *   weather: [
   *     {
   *       id: number;
   *       main: string;
   *       description: string;
   *       icon: string;
   *     }
   *   ];
   *   base: string;
   *   main: {
   *     temp: number;
   *     feels_like: number;
   *     temp_min: number;
   *     temp_max: number;
   *     pressure: number;
   *     humidity: number;
   *     sea_level: number;
   *     grnd_level: number;
   *   };
   *   visibility: number;
   *   wind: {
   *     speed: number;
   *     deg: number;
   *     gust: number;
   *   };
   *   clouds: { all: number; };
   *   dt: number;
   *   sys: {
   *     type: number;
   *     id: number;
   *     country: string;
   *     sunrise: number;
   *     sunset: number;
   *   };
   *   timezone: number;
   *   id: number;
   *   name: string;
   *   cod: 200
   * }}
   */
  const data = await response.json();

  console.log("api fetch data", data);

  return res.status(200).json({ data });
  
  // console.log("got a request from client", req.query);
  /*`https://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_KEY}&q=`;*/
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
  
});
// five day weather forecast call
app.get("/fiveday", async (req, res) => {
  if (!req.query.q) {
    return res.status(422).json({ error: "Error! missing q query parameter!" });
  }
  console.log("got a request for fiveday forecast from client", req.query.q);
  /**
   * @type {string | void} 
   */
  const fivedayQuery = req.query.q;
  /*`https://api.openweathermap.org/data/2.5/forecast?APPID=${WEATHER_KEY}&q=`;*/
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&q=${fivedayQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("error when requesting for five day forecast");
    res.status(500).json({ error })
  }
});

app.get("/uvindex", async (req, res) => {
  if (!req.query.lat || !req.query.lon) {
    return res.status(422).json({ error: "Error! missing lat and lon query parameters!" });
  }
  try {
    /* `https://api.openweathermap.org/data/2.5/uvi?lat=`;*/
    const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log("\x1b[45m", `listening on PORT ${PORT}`, "\x1b[00m");
});