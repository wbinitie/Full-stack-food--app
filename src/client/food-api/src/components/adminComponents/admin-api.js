const url = "http://localhost:8080";

const addNewRestaurant = async (name, credentials) => {
  try {
    let response = await fetch(`${url}/restaurant`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(name),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const deleteRestaurant = async (id, credentials) => {
  try {
    let response = await fetch(`${url}/restaurant/${id}`, {
      method: "DELETE",
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
const getRestaurant = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${url}/restaurant/${params.restaurantId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
        signal,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateFood = async (food, params, credentials) => {
  try {
    let response = await fetch(`${url}/foods/${params.foodId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(food),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const deleteFood = async (params, credentials) => {
  try {
    let response = await fetch(`${url}/foods/${params.foodId}`, {
      method: "DELETE",
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
const addFood = async (food, params, credentials) => {
  try {
    let response = await fetch(`${url}/foods/${params.restaurantId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(food),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const adminGetOrders = async (signal, credentials) => {
  try {
    let response = await fetch(`${url}/admin/getOrders`, {
      method: "GET",
      signal,
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

const downloadRequest = async (credentials) => {
  try {
    let response = await fetch(`${url}/admin/downloadOrders`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="filename.xlsx"; filename*=utf-8''filename.xlsx;`,
        Authorization: "Bearer " + credentials.t,
      },
      responseType: "blob",
    });
    // console.log(response);
    return await response.blob();
  } catch (error) {
    console.log(error);
  }
};
export {
  addNewRestaurant,
  deleteRestaurant,
  getRestaurant,
  updateFood,
  addFood,
  deleteFood,
  adminGetOrders,
  downloadRequest,
};
