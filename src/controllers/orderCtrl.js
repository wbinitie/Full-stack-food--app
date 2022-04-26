const Order = require("../models/order");

const createOrder = async (req, res) => {
  const newOrder = new Order({ ...req.body, author: req.user._id });
  await newOrder.populate("author");
  try {
    await newOrder.save();
    res.status(201).send({ message: "Order created successfully", newOrder });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const updateOrder = async (req, res) => {};

const deleteOrder = async (req, res) => {};

const getUserOrders = async (req, res) => {};

const getAllOrdersForDay = async (req, res) => {};

module.exports = { createOrder };
