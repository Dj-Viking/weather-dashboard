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

  /**
   * @type {string} city name that was sent from the client 
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

  return res.status(200).json( { data } )
  
  // console.log("got a request from client", req.query);
  /*`https://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_KEY}&q=`;*/
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
  
});
// five day weather forecast call
app.get("/fiveday", async (req, res) => {
  console.log("got a request for fiveday forecast from client", req.query);
  /*`https://api.openweathermap.org/data/2.5/forecast?APPID=${WEATHER_KEY}&q=`;*/
  try {
     
  } catch (error) {
    console.error("error when requesting for five day forecast");
    res.status(500).json({ error })
  }
});

app.get("/uvindex", async (req, res) => {
  console.log("got request for uv index");
  console.log("")
});

app.listen(PORT, () => {
  console.log("\x1b[45m", `listening on PORT ${PORT}`, "\x1b[00m");
});