const Cart = require("../models/cart");

exports.cartRepo = async (id) => {
  const carts = await Cart.findOne({ author: id }).populate({
    path: "items.foodId",
    select: "foodName price total",
  });
  return carts;
};
// exports.addItem = async (payload, author) => {
//   // const newItem = await Cart.create(payload);
//   // return newItem;
//   const cart = new Cart({ ...payload, author });
//   await cart.populate("author");
//   return cart;
// };
