"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config("../");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
const { API_KEY } = process.env;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/current", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.q) {
        return res.status(422).json({ error: "Error! missing q query parameter!" });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=${API_KEY}`;
    try {
        const response = yield (0, node_fetch_1.default)(url);
        const data = yield response.json();
        console.log("api fetch data", data);
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}));
app.get("/fiveday", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.q) {
        return res.status(422).json({ error: "Error! missing q query parameter!" });
    }
    console.log("got a request for fiveday forecast from client", req.query.q);
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&q=${req.query.q}`;
        const response = yield (0, node_fetch_1.default)(url);
        const data = yield response.json();
        console.log("five day forecast data", data);
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error("error when requesting for five day forecast");
        return res.status(500).json({ error });
    }
}));
app.get("/uvindex", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.lat || !req.query.lon) {
        return res.status(422).json({ error: "Error! missing lat and lon query parameters!" });
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${API_KEY}`;
        const response = yield (0, node_fetch_1.default)(url);
        const data = yield response.json();
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}));
app.listen(PORT, () => {
    console.log("\x1b[45m", `listening on PORT ${PORT}`, "\x1b[00m");
});
//# sourceMappingURL=index.js.map