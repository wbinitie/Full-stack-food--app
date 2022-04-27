const Cart = require("../models/cart");
const Food = require("../models/food");
const foodRepo = require("../repo/foodRepo");
const { cartRepo, addItem } = require("../repo/cartRepo");
const { response } = require("express");

const addToCart = async (req, res) => {
  const { foodId } = req.body;
  const quantity = Number.parseInt(req.body.quantity, 10); // always rounds up

  try {
    let cart = await cartRepo();
    const foodDetails = await foodRepo.foodById(foodId);
    if (!foodDetails)
      return res.status(404).send({ message: "Food Not Found" });

    // if cart exists
    if (cart) {
      // check if index exists
      const indexFound = cart.items.findIndex(
        (item) => item.foodId.id === foodId
      );
      // find index finds the index of the first element which satisfies the condition otherwise returns -1
      // This removes  an item from the cart if quantity is set to zero
      if (indexFound !== -1 && quantity <= 0) {
        //if index exists
        cart.items.splice(indexFound, 1); // splice items from the cart that are set to zero using the index found.
        if (cart.items.length === 0) {
          cart.subTotal = 0; // set subTotal to zero
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total) //create an array of total of all items
            .reduce((acc, next) => acc + next); // adds all items of the array
        }
        //---Check if product exist, just add the previous quantity with the new quantity and update the total price.
      } else if (indexFound !== -1) {
        cart.items[indexFound].quantity += quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * foodDetails.price;
        cart.items[indexFound].price = foodDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
        // console.log(cart.subTotal);
      } else if (quantity > 0) {
        // console.log(foodDetails);
        const { dish: foodName, price } = foodDetails;
        cart.items.push({
          foodName,
          quantity,
          foodId,
          price,
          total: parseInt(price * quantity, 10),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else {
        // if quantity or price is zero
        return res
          .status(400)
          .json({ message: "Bad request. Quantity or price cannot be zero" });
      }
      const data = await cart.save();
      res.status(200).send({ message: "cart saved successfully", data });
    }

    // ---This creates a new cart and then adds the item to the cart that has been created ---
    else {
      const { dish: foodName, price } = foodDetails;
      const cartData = {
        items: [
          {
            foodName,
            foodId,
            quantity,
            price,
            total: parseInt(price * quantity, 10),
          },
        ],
        subTotal: parseInt(price * quantity, 10),
      };
      cart = await addItem(cartData);
      res.status(200).send({ message: "cart saved successfully", data });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const removeSingleFoodFromCart = async (req, res) => {
  const { foodId } = req.body;

  try {
    const cart = await cartRepo();
    const foodDetails = await foodRepo.foodById(foodId);
    if (!foodDetails)
      return res.status(404).send({ message: "Food not found" });

    if (cart) {
      //---Check if index exists
      const indexFound = cart.items.findIndex(
        (item) => item.foodId.id === foodId
      );
      if (indexFound >= 0 && cart.items[indexFound].quantity > 1) {
        // remove item if index is greater than 0 and there is more than one item
        cart.items[indexFound].quantity = cart.items[indexFound].quantity - 1;
        cart.items[indexFound].total =
          cart.items[indexFound].total - cart.items[indexFound].price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else if (indexFound >= 0 && cart.items[indexFound].quantity === 1) {
        // remove item if index is greater than 0 and there is one item
        cart.items.splice(indexFound, 1);
        if (cart.items.length > 0) {
          // check if the items array is empty or not
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        } else {
          cart.subTotal = 0;
        }
      }
    }

    const data = await cart.save();

    res.status(200).send({ message: "Item removed successfully", data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await cartRepo();
    cart.items = [];
    cart.subTotal = 0;
    const data = await cart.save();
    res.status(200).send({ message: "Cart cleared", data });
  } catch (error) {
    res.status(500).json(err);
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await cartRepo();
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send({ cart });
  } catch (error) {
    res.status(500).json(err);
  }
};

const getAllCarts = async (req, res) => {
  const cart = await cartRepo();
  res.send({ cart });
};

module.exports = {
  addToCart,
  getUserCart,
  clearCart,
  removeSingleFoodFromCart,
  getAllCarts,
};
