const Food = require("../models/food");

exports.foodById = async (id) => {
  const food = await Food.findById(id);
  return food;
};
