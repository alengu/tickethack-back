const moment = require("moment");

const Cart = require("../models/carts");
const { firstLetterCapital } = require("../utils/string");

const checkAvailableCart = async () => {
  const searchParams = {
    userID: process.env.USER_ID,
    status: "pending",
  };

  return await Cart.findOne(searchParams);
};

const createCart = async () => {
  let newCart = new Cart({
    status: "pending",
    userID: process.env.USER_ID,
    trips: [],
  });

  newCart.save().then(() => console.log("new cart created"));
};

const addTripToCart = async (tripID) => {
  console.log("trying to add order")
  const cart = await Cart.updateOne(
    { userID: process.env.USER_ID },
    { $push: { trips: tripID } }
  );

  console.log("try to update finished")
  console.log(cart);
};

module.exports = { checkAvailableCart, addTripToCart, createCart };
