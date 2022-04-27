const express = require("express");
const router = new express.Router();

const { adminAuth } = require("../middleware/auth");

const {
  addRestaurant,
  removeRestaurant,
  updateRestaurant,
  getRestaurant,
  getAllRestaurant,
} = require("../controllers/restaurantCtrl");

router
  .route("/restaurant")
  .get(adminAuth, getAllRestaurant)
  .post(adminAuth, addRestaurant);

router
  .route("/restaurant/:id")
  .get(adminAuth, getRestaurant)
  .patch(adminAuth, updateRestaurant)
  .delete(adminAuth, removeRestaurant);

module.exports = router;
