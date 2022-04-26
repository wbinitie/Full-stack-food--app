const User = require("../models/user");
const Food = require("../models/food");

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();

    res.status(201).send({ message: "User created successfully", user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const selectFood = async (req, res) => {
  const id = req.params.id;

  try {
    const findFood = await Food.findById(id);
    if (!findFood) return null;
    const user = req.user;
    user.foods = user.foods.concat({ findFood });
    await user.save();
    res.send({ user, findFood });
  } catch (error) {
    res.status(500).send(error);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("User logged out successfully");
  } catch (error) {
    res.status(500).send();
  }
};

const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("User logged out successfully on all devices");
  } catch (error) {
    res.status(500).send();
  }
};

const getUserProfile = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  createUser,
  logOut,
  logOutAll,
  logIn,
  selectFood,
  getUserProfile,
};
