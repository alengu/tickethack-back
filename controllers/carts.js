const { checkAvailableCart, addTripToCart, createCart, deleteTripInCart } = require("../repository/carts");

const addTrip = async (req, res, next) => {
  try {

    if (await checkAvailableCart()=== null ) {
        await createCart()
    }
    
    const cart = await addTripToCart(req.body.tripID)
    
    res.json(cart);


  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTrip = async (req, res, next) => {
    try {

       const cart = await deleteTripInCart(req.body.tripID)
        res.json(cart)
    }
    catch (exception) {
        console.log(exception);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = { addTrip, deleteTrip };