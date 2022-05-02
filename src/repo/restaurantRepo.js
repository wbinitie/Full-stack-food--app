const Restaurant = require("../models/restaurant");
const allRestaurant = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find();
    if (!allRestaurants)
      return res.status(404).send({ message: "No Restaurants found" });

    return allRestaurants;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = allRestaurant;
