const express = require("express");
const router = new express.Router();
const { auth } = require("../middleware/auth");

const {
  addToCart,
  getUserCart,
  clearCart,
  removeSingleFoodFromCart,
} = require("../controllers/cartCtrl");

router
  .route("/cart")
  .post(auth, addToCart)
  .get(auth, getUserCart)
  .patch(auth, removeSingleFoodFromCart)
  .delete(auth, clearCart);

module.exports = router;
