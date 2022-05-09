const Cart = require("../models/cart");
const User = require("../models/user");

const toJSON = async () => {
  const allCarts = await Cart.find();

  let mappedAllCarts = allCarts.map((order) => {
    return order.toObject();
  });
  return mappedAllCarts;
};

const getTotals = async (i) => {
  let total = await toJSON();
  return total[i].subTotal;
};

const getAuthors = async () => {
  let authorId = await toJSON();
  return authorId.map((order) => {
    return order.author.toString();
  });
};

const getName = async (i) => {
  let authorId = await getAuthors();
  const user = await User.findById(authorId[i]);
  if (!user) return res.status(404).send({ message: "User not found" });
  return user.name;
};

const getOrder = async (i) => {
  let order = await toJSON();
  order = order[i].items
    .map((item) => {
      return item.foodName + " x" + item.quantity;
    })
    .join(", ");

  return order;
};
module.exports = { getName, getOrder, getAuthors, getTotals };
