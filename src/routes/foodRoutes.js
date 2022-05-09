const express = require("express");
const router = new express.Router();

const { auth, adminAuth } = require("../middleware/auth");

const {
  createFood,
  updateFood,
  removeFood,
  getAllFoods,
  getSingleFood,
} = require("../controllers/foodCtrl");

router.route("/foods").get(auth, getAllFoods);
router
  .route("/foods/:id")
  .post(auth, adminAuth, createFood)
  .get(getSingleFood)
  .patch(auth, adminAuth, updateFood)
  .delete(auth, adminAuth, removeFood);

module.exports = router;
