const moment = require("moment");

const Cart = require("../models/carts");
const Trip = require("../models/trips");

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
    totalCart: 0,
  });

  await newCart.save().then(() => console.log("new cart created"));

  return newCart;
};

const getCart = async () => {
  const cart = await Cart.findOne({ userID: process.env.USER_ID }).populate(
    "trips"
  );
  //console.log(cart)
  if (!cart) {
    return null;
  } else if (cart.trips.length > 1) {
    cart.trips.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return cart;
};

const addTripToCart = async (tripID) => {
  console.log("trying to add trip to cart");
  const addedTrip = await Trip.findById(tripID);

  const cart = await Cart.updateOne(
    { userID: process.env.USER_ID },
    { $push: { trips: tripID }, $inc: { totalCart: addedTrip.price } }
  );

  //console.log(cart);
  return cart;
};

const deleteTripInCart = async (tripID) => {
  console.log("deleting trip in cart");
  const updatedCart = await Cart.updateOne(
    { userID: process.env.USER_ID },
    { $pull: { trips: tripID } }
  );
};
module.exports = {
  checkAvailableCart,
  addTripToCart,
  createCart,
  deleteTripInCart,
  getCart,
};
