const express = require("express");
const router = express.Router();

//const { searchTrips } = require("../controllers/trips");

//router.get("/", searchTrips);

const {addTrip, deleteTrip, displayCart} = require("../controllers/carts")
router.post("/add-trip", addTrip)
router.delete("/", deleteTrip)
router.get("/", displayCart)

module.exports = router;
