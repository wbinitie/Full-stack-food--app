const express = require("express");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
require("./db/mongoose");

const app = express();

// app.use((req, res, next) => {
//   res.send("Server is currently under maintenance");
// });

app.use(express.json());
app.use(userRoutes);
app.use(foodRoutes);
app.use(cartRoutes);

module.exports = app;
