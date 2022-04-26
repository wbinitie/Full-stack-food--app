const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!isEmail(value)) throw new Error("Invalid Email");
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Your password cannot contain 'password'");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("cart", {
  ref: "Cart",
  localField: "_id",
  foreignField: "author",
});

//instance methods
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject(); // converts the document into plain-old javascript object

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//find By Credentials
//Model methods
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch || !user) throw new Error("Unable to Login");
  return user;
};

// hash the plain password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
