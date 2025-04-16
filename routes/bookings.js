const express = require("express");
const router = express.Router();
;

// const {addTrip, deleteTrip} = require("../controllers/carts")
// router.post("/add-trip", addTrip)
// router.delete("/delete-trip", deleteTrip)

const {addTrip, displayBooking} = require("../controllers/bookings")
router.post("/add-trips", addTrip)
router.get("/", displayBooking)

module.exports = router;