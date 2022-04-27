const Cart = require("../models/cart");

exports.cartRepo = async (id) => {
  const carts = await Cart.findOne({ author: id }).populate({
    path: "items.foodId",
    select: "foodName price total",
  });
  return carts;
};
