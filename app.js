const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const tripsRouter = require("./routes/trips");
const cartsRouter = require("./routes/carts");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

require("./config/connexion");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/trips", tripsRouter);
app.use("/carts", cartsRouter)

module.exports = app;
