const express = require("express");
const router = new express.Router();

const { auth, adminAuth } = require("../middleware/auth");
const {
  adminLogIn,
  adminLogOut,
  adminLogOutAll,
  getAdminProfile,
} = require("../controllers/adminCtrl.js");

router.route("/admin/login").post(adminLogIn);
router.route("/admin/logout").post(auth, adminLogOut);
router.route("/admin/logoutall").post(auth, adminLogOutAll);

router.route("/admin/me").get(auth, adminAuth, getAdminProfile);

module.exports = router;
