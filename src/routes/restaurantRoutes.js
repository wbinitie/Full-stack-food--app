const express = require("express");
const router = new express.Router();

const { auth, adminAuth } = require("../middleware/auth");

const {
  addRestaurant,
  removeRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurant,
} = require("../controllers/restaurantCtrl");

router
  .route("/restaurant")
  .get(getAllRestaurant)
  .post(auth, adminAuth, addRestaurant);

router
  .route("/restaurant/:id")
  .get(auth, adminAuth, getRestaurant)
  .patch(auth, adminAuth, updateRestaurant)
  .delete(auth, adminAuth, removeRestaurant);

module.exports = router;
