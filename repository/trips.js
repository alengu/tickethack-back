const moment = require("moment");

const Trip = require("../models/trips");
const { firstLetterCapital } = require("../utils/string");

const getTripsByDate = async ({ departure, arrival, date }) => {
  const startOfDay = moment(date).startOf("day").toDate();
  const endOfDay = moment(date).endOf("day").toDate();

  const searchParams = {
    departure: firstLetterCapital(departure),
    arrival: firstLetterCapital(arrival),
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  };

  return await Trip.find(searchParams).sort({ date: 1 });
};

module.exports = { getTripsByDate };
