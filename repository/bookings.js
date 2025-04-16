const moment = require("moment");

const Cart = require("../models/carts");
const Booking = require("../models/bookings");
const Trip = require("../models/trips");

const getBooking = async () => {
  const booking = await Booking.find({ userID: process.env.USER_ID }).populate(
    "trips"
  );
  console.log(booking);
  if (!booking) {
    return null;
  } else if (booking.length === 0) {
    return null;
  } else if (booking[0].trips.length > 1) {
    console.log(booking[0].trips[0]);
    booking[0].trips.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return booking;
};

const checkExistingBooking = async () => {
  const searchParams = {
    userID: process.env.USER_ID,
  };

  return await Booking.findOne(searchParams);
};

const createBooking = async () => {
  let newBooking = new Booking({
    userID: process.env.USER_ID,
    trips: [],
    totalBooking: 0,
  });

  newBooking.save().then(() => console.log("new booking created"));

  return newBooking;
};

const addTripsToBooking = async (cartID) => {
  console.log("trying to add trips to booking");

  //console.log(cartID);
  const cartToPay = await Cart.findById(cartID); // récupération du cart à ajouter aux bookings

  if (!cartToPay) {
    return console.log("Cart not found");
  } else {
    await cartToPay.populate("trips"); // on récupère les infos de chaque trip à ajouter aux bookings
    //console.log(cartToPay);
    const booking = await Booking.findOne({ userID: process.env.USER_ID }); // pour les bookings du user, on ajoute tous les trips
    for (let tripToBooking of cartToPay.trips) {
      console.log("trying to add => ", tripToBooking);
      //trip by trip...
      await booking.updateOne({
        $push: { trips: tripToBooking._id }, // on push le trip ID dans la liste de trips des bookings
        $inc: { totalBooking: tripToBooking.price }, // on incrémente le total des bookings
      });

      console.log("booking current status =>", booking);
    }
    await booking.populate("trips"); // on populate les trips pour pouvoir exporter l'information au front

    const updatedCart = await Cart.findByIdAndDelete(cartID);
    console.log(`cart deleted  ${cartID}`);

    return booking;
  }
};

module.exports = {
  addTripsToBooking,
  createBooking,
  checkExistingBooking,
  getBooking,
};
