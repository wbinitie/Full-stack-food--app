const express = require("express");
const router = new express.Router();
const { auth, adminAuth } = require("../middleware/auth");

const {
  addToCart,
  getUserCart,
  clearCart,
  removeSingleFoodFromCart,
  getAllCarts,
  getOrderForTheDay,
} = require("../controllers/cartCtrl");

router.route("/admin/cart").get(auth, adminAuth, getAllCarts);

router.route("/admin/getOrders").get(auth, adminAuth, getOrderForTheDay);

router
  .route("/cart")
  .post(auth, addToCart)
  .get(auth, getUserCart)
  .patch(auth, removeSingleFoodFromCart)
  .delete(auth, clearCart);

module.exports = router;
