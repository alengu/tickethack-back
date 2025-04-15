const express = require("express");
const router = express.Router();

//const { searchTrips } = require("../controllers/trips");

//router.get("/", searchTrips);

const {addTrip} = require("../controllers/carts")
router.post("/add-trip", addTrip)

module.exports = router;
