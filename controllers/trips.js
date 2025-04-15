const { getTripsByDate } = require("../repository/trips");

const searchTrips = async (req, res, next) => {
  try {
    const trips = await getTripsByDate(req.query);
    res.json(trips);
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { searchTrips };
