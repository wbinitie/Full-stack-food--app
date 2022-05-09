const foodRepo = require("../repo/foodRepo");
const Cart = require("../models/cart");
const Order = require("../models/order");
const xl = require("excel4node");

const {
  getName,
  getOrder,
  getAuthors,
  getTotals,
} = require("../repo/orderRepo");

const { cartRepo } = require("../repo/cartRepo");

const addToCart = async (req, res) => {
  const { foodId } = req.body;
  const quantity = Number.parseInt(req.body.quantity, 10); // always rounds up

  try {
    let cart = await cartRepo(req.user._id);
    const foodDetails = await foodRepo.foodById(foodId);
    if (!foodDetails)
      return res.status(404).send({ message: "Food Not Found" });

    // if cart exists
    if (cart !== null) {
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
      // cart = await addItem(cartData, req.user._id);
      // await cart.save();
      cart = new Cart({ ...cartData, author: req.user._id });
      await cart.populate("author");
      await cart.save();
      res.status(201).send({ message: "cart saved successfully", cart });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const removeSingleFoodFromCart = async (req, res) => {
  const { foodId } = req.body;

  try {
    const cart = await cartRepo(req.user._id);
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
    const cart = await cartRepo(req.user._id);
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
    const cart = await cartRepo(req.user._id);
    if (!cart) return res.status(404).send({ message: "Cart not found" });
    res.status(200).send({ cart });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCarts = async (req, res) => {
  const cart = await Cart.find();
  res.send({ cart });
};

const getOrderForTheDay = async (req, res) => {
  try {
    let authors = await getAuthors();
    let bg = [],
      h = 0;
    for (let i = 0; i < authors.length; i++) {
      bg[h] = {
        name: await getName(i),
        order: await getOrder(i),
        Total: await getTotals(i),
      };
      h++;
    }
    return bg;
    // res.send({ bg });
  } catch (error) {
    console.log(error);
  }
};

const getCheckout = async (req, res) => {
  try {
    const order = await Order.findOne({ name: req.user.name });
    if (!order) return res.status(404).send("Order not found");
    res.send({ order });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const proceedToCheckOut = async (req, res) => {
  const array = await getOrderForTheDay();
  const userArray = array.filter((user) => user.name === req.user.name);
  const newOrder = new Order(userArray[0]);
  await Cart.deleteOne({ author: req.user._id });
  try {
    newOrder.save();
    res.send({ newOrder });
  } catch (error) {
    res.status(500).json(error);
  }
};
const adminGetOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    if (!allOrders) return res.status(404).send("Orders not found");
    res.status(200).send({ allOrders });
  } catch (error) {
    res.status(500).send();
  }
};

const downloadFile = async (req, res) => {
  try {
    let allOrders = await Order.find();
    if (!allOrders) return res.status(404).send("Orders not found");

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Bg food order");

    const colorCell = (color) => {
      return wb.createStyle({
        fill: {
          type: "pattern",
          fgColor: color,
          patternType: "solid",
        },
      });
    };
    const headingColumnNames = ["Name", "Order", "Amt(NGN)"];

    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++)
        .string(heading)
        .style(colorCell("#93ccea"));
    });

    let rowIndex = 2;
    allOrders.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record.schema.obj).forEach((columnName) => {
        // console.log(columnName);
        if (typeof record[columnName] === "number") {
          ws.cell(rowIndex, columnIndex++).number(record[columnName]);
        } else {
          ws.cell(rowIndex, columnIndex++).string(record[columnName]);
        }
      });
      rowIndex++;
    });
    const total = allOrders.reduce((acc, item) => {
      return Number(acc.Total) + Number(item.Total);
    });
    ws.cell(allOrders.length + 2, 1)
      .string("Total")
      .style(colorCell("#FFFF00"));
    ws.cell(allOrders.length + 2, 2).style(colorCell("#FFFF00"));
    ws.cell(allOrders.length + 2, 3)
      .number(total)
      .style(colorCell("#FFFF00"));
    wb.write("filename.xlsx", res);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
module.exports = {
  addToCart,
  getUserCart,
  clearCart,
  removeSingleFoodFromCart,
  getAllCarts,
  getOrderForTheDay,
  proceedToCheckOut,
  getCheckout,
  adminGetOrders,
  downloadFile,
};
