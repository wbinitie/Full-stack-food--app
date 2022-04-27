const express = require("express");
const router = new express.Router();
const { auth, adminAuth } = require("../middleware/auth");

const {
  addToCart,
  getUserCart,
  clearCart,
  removeSingleFoodFromCart,
  getAllCarts,
} = require("../controllers/cartCtrl");

router.route("/admin/cart").get(adminAuth, getAllCarts);

router
  .route("/cart")
  .post(auth, addToCart)
  .get(auth, getUserCart)
  .patch(auth, removeSingleFoodFromCart)
  .delete(auth, clearCart);

module.exports = router;
