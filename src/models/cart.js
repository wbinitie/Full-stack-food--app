const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
    foodName: {
      type: "string",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartSchema = new mongoose.Schema(
  {
    items: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", CartSchema);
