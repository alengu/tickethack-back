const mongoose = require("mongoose");

const bookingsSchema = mongoose.Schema({
 userID: Number,
 trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trips'
  }],
  totalBooking : Number,

});

const bookingsModel = mongoose.model("bookings", bookingsSchema);

module.exports = bookingsModel;