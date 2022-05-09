const express = require("express");
const router = new express.Router();
const { auth } = require("../middleware/auth");
const allRestaurants = require("../repo/restaurantRepo");
const {
  createUser,
  logIn,
  logOut,
  logOutAll,
  getUserProfile,
  resetpassword,
  forgotPassword,
} = require("../controllers/userCtrl");

router.route("/users/me").get(auth, getUserProfile);
router.route("/users/signup").post(createUser);

router.get("/dashboard", auth, async (req, res) => {
  res.render("dashboard", {
    allRestaurants: await allRestaurants(),
    posts: [{ title: "rest", content: "Rest" }],
  });
});
router.route("/users/login").post(logIn);

router.route("/users/forgot-password").patch(forgotPassword);
router.route("/users/reset-password").patch(resetpassword);

router.route("/users/logout").post(auth, logOut);
router.route("/users/logoutall").post(auth, logOutAll);
router.get("/", async (req, res) => {
  res.render("home", {
    startingContent: "Welcome",
    posts: [{ title: "rest", content: "Rest" }],
  });
});
module.exports = router;
