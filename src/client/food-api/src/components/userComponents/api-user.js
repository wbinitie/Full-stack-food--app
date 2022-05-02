const url = "http://localhost:8080";

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
export { restaurantsList, addToCart };
