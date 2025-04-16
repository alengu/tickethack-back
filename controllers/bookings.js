const { addTripsToBooking, createBooking, checkExistingBooking, getBooking } = require("../repository/bookings");

const addTrip = async (req, res, next) => {
    try {
  
      if (await checkExistingBooking()=== null ) {
          await createBooking()
      }
      
      const booking = await addTripsToBooking(req.body.cartID)
      
      res.json(booking);
  
  
    } catch (exception) {
      console.log(exception);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const displayBooking = async (req, res, next) =>  {
    try {
      const booking = await getBooking()
      res.json(booking)
    }
    catch (exception) {
      console.log(exception);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  module.exports = { addTrip, displayBooking }