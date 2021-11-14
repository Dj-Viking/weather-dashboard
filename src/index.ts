require("dotenv").config("../");
import express from "express";
import path from "path";
import fetch from "node-fetch";
import { Request, Response } from "express";
import { CurrentWeatherData } from "./types";
const PORT = process.env.PORT || 4000;
const app = express();
const { API_KEY } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

//current day api call
app.get("/current", async (req: Request, res: Response): Promise<Record<string, any>> => {
  if (!req.query.q) {
    return res.status(422).json({ error: "Error! missing q query parameter!" });
  }
  /*`https://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_KEY}&q=`;*/
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json() as CurrentWeatherData;
    return res.status(200).json({ data });
  } catch (error) {
    console.error("error when requesting current weather data", error);
    return res.status(500).json({ error });
  }
  
});
// five day weather forecast call
app.get("/fiveday", async (req: Request, res: Response): Promise<Record<string, any>> => {
  if (!req.query.q) {
    return res.status(422).json({ error: "Error! missing q query parameter!" });
  }
  /*`https://api.openweathermap.org/data/2.5/forecast?APPID=${WEATHER_KEY}&q=`;*/
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&q=${req.query.q}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("error when requesting for five day forecast: ", error);
    return res.status(500).json({ error })
  }
});

app.get("/uvindex", async (req: Request, res: Response): Promise<Record<string, any>> => {
  if (!req.query.lat || !req.query.lon) {
    return res.status(422).json({ error: "Error! missing lat and lon query parameters!" });
  }
  /* `https://api.openweathermap.org/data/2.5/uvi?lat=`;*/
  try {
    const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("error when requesting for uv index: ", error);
    return res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log("\x1b[45m", `listening on PORT ${PORT}`, "\x1b[00m");
});