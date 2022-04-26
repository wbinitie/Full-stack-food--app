const Cart = require("../models/cart");

exports.cartRepo = async () => {
  const carts = await Cart.find().populate({
    path: "items.foodId",
    select: "foodName price total",
  });
  return carts[0];
};
exports.addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};
