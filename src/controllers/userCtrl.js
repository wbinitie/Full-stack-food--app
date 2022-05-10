const User = require("../models/user");
const _ = require("lodash");

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

// const selectFood = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const findFood = await Food.findById(id);
//     if (!findFood) return null;
//     const user = req.user;
//     user.foods = user.foods.concat({ findFood });
//     await user.save();
//     res.send({ user, findFood });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const resetpassword = async (req, res) => {
  const { resetLink, newPass } = req.body;
  const obj = {
    password: newPass,
    resetLink: "",
  };
  const hash = await bcrypt.hash(obj.password, 8);
  obj.password = hash;

  try {
    if (resetLink) {
      const decoded = jwt.verify(resetLink, process.env.JWT_SECRET);
      if (!decoded)
        return res
          .status(401)
          .send({ message: "Incorrect token or it has expired" });

      const user = await User.findOne({ resetLink });
      if (!user)
        return res
          .status(404)
          .send({ message: "User with this token does not exist" });
      user = _.extend(user, obj);
      user.save((err, result) => {
        if (err) return res.status(400).send({ error: "reset password error" });

        res.status(200).send({ message: "Your password has been changed" });
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ message: "User with this email does not exist" });

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    return user.updateOne({ resetLink: token }, function (err) {
      if (err)
        return res.status(400).send({ message: "Reset password link error" });
      forgotPasswordEmail(email, token);
      res.send({
        message:
          "Email has been sent successfully, Kindly follow the instructions",
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
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
  // selectFood,
  resetpassword,
  forgotPassword,
  getUserProfile,
};
