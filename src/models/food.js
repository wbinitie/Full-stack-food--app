const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    dish: {
      type: String,
      text: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
