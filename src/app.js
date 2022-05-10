const express = require("express");
// const path = require("path");

// const flash = require("connect-flash");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cors = require("cors");
const cartRoutes = require("./routes/cartRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const session = require("express-session");

require("./db/mongoose");

const app = express();

// app.use((req, res, next) => {
//   res.send("Server is currently under maintenance");
// });
const corsOptions = {
  origin: "https://bg-food-app.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
//express session
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// // EJS
// const viewsPath = path.join(__dirname, "./views");
// const publicPathDirectory = path.join(__dirname, "./public");

// // Setup static directory to serve
// app.use(express.static(publicPathDirectory));

// app.set("view engine", "ejs");
// app.set("views", viewsPath);

// //connect flash
// app.use(flash());

// global vars
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   next();
// });

app.use(userRoutes);
app.use(foodRoutes);
app.use(cartRoutes);
app.use(restaurantRoutes);

app.use(adminRoutes);

module.exports = app;
