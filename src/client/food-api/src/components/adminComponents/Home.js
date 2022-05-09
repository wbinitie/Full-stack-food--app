import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import auth from "../../auth/auth-helper";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import fileDownload from "js-file-download";

import { useHistory } from "react-router-dom";
import { restaurantsList } from "../userComponents/api-user.js";
import {
  addNewRestaurant,
  deleteRestaurant,
  adminGetOrders,
  downloadRequest,
} from "./admin-api";
import Modal from "../Core/Modal";

const Home = () => {
  const history = useHistory();
  const jwt = auth.isAuthenticated();
  const alert = useAlert();

  const [newRestaurant, setNewRestaurant] = useState({ name: "" });
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    //The signal read-only property of the AbortController returns an AbortSignal object,
    // which can be used to remove the event listener.
    const abortController = new AbortController();
    const signal = abortController.signal;
    restaurantsList(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRestaurants(data);
      }
    });

    return () => {
      //clean up function
      abortController.abort();
    };
  }, [open, refreshKey]);

  useEffect(() => {
    //The signal read-only property of the AbortController returns an AbortSignal object,
    // which can be used to remove the event listener.
    const abortController = new AbortController();
    const signal = abortController.signal;

    adminGetOrders(signal, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
    return () => {
      //clean up function
      abortController.abort();
    };
  }, [jwt.token]);

  const openModal = () => {
    setOpen(!open);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };
  const clickAdd = (e) => {
    e.preventDefault();
    const newRestaurantBody = {
      name: newRestaurant.name || undefined,
    };

    addNewRestaurant(newRestaurantBody, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        alert.success("New Restaurant Added");
        setOpen(!open);
      }
    });
  };
  const current = new Date();
  const date = `${current.getFullYear()}-0${
    current.getMonth() + 1
  }-0${current.getDate()}`;
  const todayArray =
    orders.allOrders &&
    orders.allOrders.filter((order) => order.createdAt.slice(0, 10) === date);
  const clickExport = (e) => {
    e.preventDefault();
    downloadRequest({ t: jwt.token }).then((response) => {
      fileDownload(response, "filename.xlsx");
    });
  };
  return (
    <div>
      <nav>
        <ul className="flex justify-between text-xl py-8 px-8 md:px-48 ">
          <li>
            <img src={logo} alt="logo" />{" "}
          </li>
          <li>
            <div className="flex sm:justify-center fond-bold">
              <p className="px-3 flex items-center cursor-pointer">
                <a href="#Restaurants">Restaurants</a>
              </p>
              <p className="pl-3 pr-6 flex items-center cursor-pointer">
                <a href="#Orders">Orders</a>
              </p>
              {auth.isAuthenticated() && (
                <span>
                  <button
                    className="px-4 py-2 bg-[#032F8E]  rounded-md text-white"
                    onClick={() => {
                      auth.clearJWT("admin", () => {
                        history.push("/adminSignIn");
                      });
                    }}
                  >
                    Sign Out
                  </button>
                </span>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <h1 className="text-center mt-8 text-3xl font-bold ">Welcome Admin!</h1>
      <section id="Restaurants" className="mt-10">
        <div className="text-center font-bold text-lg mx-20">
          <h1>Restaurants</h1>
        </div>
        <div className="flex justify-around">
          <h2>List of Restaurants</h2>
          <button
            onClick={openModal}
            className="px-2 py-1 bg-[#032F8E]  rounded-md text-white"
          >
            Add New Restaurant
          </button>
          <Modal
            title={"Add New Restaurant"}
            show={open}
            onClose={() => setOpen(false)}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                value={newRestaurant.name}
                onChange={handleChange}
                placeholder="New Restaurant name"
              />
              <button
                onClick={clickAdd}
                className="px-2 py-1 mt-2 bg-[#032F8E]  rounded-md text-white"
              >
                Add
              </button>
            </div>
          </Modal>
        </div>
        <div className="mx-60 my-3">
          <ol>
            {restaurants.allRestaurants &&
              restaurants.allRestaurants.map((restaurant, index) => (
                <div key={index} className="flex justify-between items-center">
                  <li className="pb-3">
                    {index + 1}. {restaurant.name}
                  </li>
                  <span className=" flex items-center">
                    <Link to={"/restaurant/edit/" + restaurant._id}>
                      <button
                        type="button"
                        className=" mx-1 bg-transparent border-none p-0 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </Link>
                    |
                    <button
                      type="button"
                      onClick={() => {
                        deleteRestaurant(restaurant._id, { t: jwt.token }).then(
                          (data) => {
                            if (data && data.error) {
                              console.log(data.error);
                            } else {
                              alert.success("Restaurant removed");
                              setRefreshKey((oldKey) => oldKey + 1);
                            }
                          }
                        );
                      }}
                      className=" ml-1 bg-transparent border-none p-0 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
          </ol>
        </div>
      </section>
      <section id="Orders" className="mt-10">
        <div className="flex justify-between mx-10">
          <h1 className="text-3xl">Orders</h1>
          <button
            onClick={clickExport}
            className="px-2 mx-2 bg-black text-white"
          >
            EXPORT{" "}
          </button>
        </div>
        <div className="mx-10">
          <div className="mb-4 border-b border-gray-200">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                  id="profile-tab"
                  data-tabs-target="#allOrders"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  All Orders
                </button>
              </li>
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                  id="dashboard-tab"
                  data-tabs-target="#todayTab"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Today's Orders
                </button>
              </li>
            </ul>
          </div>
          <div id="myTabContent">
            <div
              className="p-4 bg-white rounded-lg flex justify-center"
              id="allOrders"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.allOrders &&
                      orders.allOrders.map((order, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            <Moment format="LLLL">{order.createdAt}</Moment>
                          </th>
                          <td className="px-6 py-4">{order.name}</td>
                          <td className="px-6 py-4">{order.order}</td>
                          <td className="px-6 py-4">{order.Total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="hidden p-4 bg-gray-50 rounded-lg"
              id="todayTab"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.allOrders &&
                      todayArray.map((order, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            <Moment format="LLLL">{order.createdAt}</Moment>
                          </th>
                          <td className="px-6 py-4">{order.name}</td>
                          <td className="px-6 py-4">{order.order}</td>
                          <td className="px-6 py-4">{order.Total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
