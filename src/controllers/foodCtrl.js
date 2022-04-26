const Food = require("../models/food");

const createFood = async (req, res) => {
  const food = new Food({ ...req.body });
  try {
    await food.save();
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
    if (!food) return res.status(404).send({ message: "Food not found" });
    toUpdate.forEach((update) => (food[update] = req.body[update]));
    await food.save();

    res.send({ message: "Food Updated", food });
  } catch (error) {
    res.status(404).send({ error });
  }
};
const removeFood = async (req, res) => {
  const id = req.params.id;
  try {
    const food = await Food.findOneAndDelete({
      _id: id,
    });
    if (!food) return res.status(404).send({ message: "Food not found" });
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
