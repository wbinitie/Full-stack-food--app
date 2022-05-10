const url = "https://binitie-bg-food-app.herokuapp.com";

const create = async (user) => {
  try {
    let response = await fetch(`${url}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const restaurantsList = async (signal) => {
  try {
    let response = await fetch(`${url}/restaurant`, {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const getCart = async (credentials, signal) => {
  try {
    let response = await fetch(`${url}/cart`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const removeSingleItem = async (foodId, credentials) => {
  try {
    let response = await fetch(`${url}/cart`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ foodId }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const addToCart = async (order, credentials) => {
  try {
    let response = await fetch(`${url}/cart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(order),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const proceedToCheckOut = async (credentials) => {
  try {
    let response = await fetch(`${url}/user/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export {
  create,
  restaurantsList,
  addToCart,
  getCart,
  removeSingleItem,
  proceedToCheckOut,
};
