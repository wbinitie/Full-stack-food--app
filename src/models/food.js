const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    dish: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = { Food, foodSchema };
