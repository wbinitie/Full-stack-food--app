const express = require("express");
const router = new express.Router();
const { auth } = require("../middleware/auth");

const {
  createUser,
  logIn,
  logOut,
  logOutAll,
  selectFood,
  getUserProfile,
} = require("../controllers/userCtrl");

router.route("/users/me").get(auth, getUserProfile);

router.route("/users").post(createUser);
router.route("/users/menu/:id").post(auth, selectFood);

router.route("/users/login").post(logIn);

router.route("/users/logout").post(auth, logOut);
router.route("/users/logoutall").post(auth, logOutAll);

module.exports = router;
