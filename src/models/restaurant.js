const mongoose = require("mongoose");
const { foodSchema } = require("./food");

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      text: true,
      required: true,
      unique: true,
    },
    menu: [foodSchema],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
