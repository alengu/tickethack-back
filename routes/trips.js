const express = require("express");
const router = express.Router();

const { searchTrips } = require("../controllers/trips");

router.get("/", searchTrips);

module.exports = router;
