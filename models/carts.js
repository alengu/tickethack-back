const mongoose = require("mongoose");

const cartsSchema = mongoose.Schema({
 userID: Number,
 status : String,
 trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trips'
  }],

});

const cartsModel = mongoose.model("carts", cartsSchema);

module.exports = cartsModel;
