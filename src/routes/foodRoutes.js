const express = require("express");
const router = new express.Router();

const { adminAuth } = require("../middleware/auth");

const {
  createFood,
  updateFood,
  removeFood,
  getAllFoods,
  getSingleFood,
} = require("../controllers/foodCtrl");

router.route("/foods").get(adminAuth, getAllFoods).post(adminAuth, createFood);

router
  .route("/foods/:id")
  .get(getSingleFood)
  .patch(adminAuth, updateFood)
  .delete(adminAuth, removeFood);

module.exports = router;
