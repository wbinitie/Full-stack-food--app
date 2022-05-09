const User = require("../models/user");

const adminLogIn = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findByAdminCredentials(password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

const adminLogOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("Admin logged out successfully");
  } catch (error) {
    res.status(500).send();
  }
};

const adminLogOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("User logged out successfully on all devices");
  } catch (error) {
    res.status(500).send();
  }
};

const getAdminProfile = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  adminLogIn,
  adminLogOut,
  adminLogOutAll,
  getAdminProfile,
};
