const Restaurant = require("../models/restaurant");

const addRestaurant = async (req, res) => {
  const newRestaurant = new Restaurant({ ...req.body });
  try {
    await newRestaurant.save();

    res
      .status(201)
      .send({ message: "Restaurant saved successfully", newRestaurant });
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeRestaurant = async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await Restaurant.findOneAndDelete({
      _id: id,
    });
    if (!restaurant)
      return res.status(404).send({ message: "Restaurant not found" });
    res.send({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).send();
  }
};

const updateRestaurant = async (req, res) => {
  const allowedUpdates = Object.keys(Restaurant.schema.obj);
  const toUpdate = Object.keys(req.body);
  //   console.log(toUpdate);

  const isValidUpdate = toUpdate.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate)
    return res.status(400).send({ message: "Invalid update" });
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
    });
    if (!restaurant)
      return res.status(404).send({ message: "Restaurant not found" });
    toUpdate.forEach((update) => (restaurant[update] = req.body[update]));
    await restaurant.save();

    res.send({ message: "Restaurant Updated", restaurant });
  } catch (error) {
    res.status(404).send({ error });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    res.send(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find();
    if (!allRestaurants)
      return res.status(404).send({ message: "No Restaurants found" });

    res.status(200).send({ message: "Restaurants found", allRestaurants });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addRestaurant,
  removeRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurant,
};
