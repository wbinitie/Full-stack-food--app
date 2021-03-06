const { Food } = require("../models/food");
const Restaurant = require("../models/restaurant");

const createFood = async (req, res) => {
  const food = new Food({ ...req.body, restaurant: req.params.id });
  const restaurant = await Restaurant.findById(req.params.id);

  restaurant.menu = restaurant.menu.concat(food);
  try {
    await food.save();
    await restaurant.save();
    res.status(201).send({ message: "Food saved successfully", food });
  } catch (err) {
    res.status(400).send(err);
  }
};
const updateFood = async (req, res) => {
  const allowedUpdates = Object.keys(Food.schema.obj);
  const toUpdate = Object.keys(req.body);
  //   console.log(toUpdate);

  const isValidUpdate = toUpdate.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate)
    return res.status(400).send({ message: "Invalid update" });
  try {
    const food = await Food.findOne({
      _id: req.params.id,
    });
    const restaurantId = food.restaurant;
    const restaurant = await Restaurant.findById(restaurantId);

    restaurant.menu = restaurant.menu.filter(
      (food) => food.id != req.params.id
    );

    if (!food) return res.status(404).send({ message: "Food not found" });
    toUpdate.forEach((update) => (food[update] = req.body[update]));
    restaurant.menu = restaurant.menu.concat(food);

    await food.save();
    await restaurant.save();

    res.send({ message: "Food Updated", food });
  } catch (error) {
    res.status(404).send({ error });
  }
};
const removeFood = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedFood = await Food.findOneAndDelete({
      _id: id,
    });
    if (!deletedFood)
      return res.status(404).send({ message: "Food not found" });
    const restaurant = await Restaurant.findOne({
      _id: deletedFood.restaurant,
    });
    restaurant.menu = restaurant.menu.filter(
      (dish) => dish.id != req.params.id
    );
    await restaurant.save();

    res.send({ message: "Food deleted" });
  } catch (error) {
    res.status(500).send();
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getSingleFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).send("Food not found");
    res.send(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createFood,
  updateFood,
  removeFood,
  getAllFoods,
  getSingleFood,
};
