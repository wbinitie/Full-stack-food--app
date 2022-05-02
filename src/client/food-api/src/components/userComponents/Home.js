import Menu from "../Core/Menu";
import auth from "../../auth/auth-helper";
import { restaurantsList, addToCart } from "./api-user";
import React, { useState, useEffect } from "react";
import Modal from "../Core/Modal";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [fruit, setFruits] = useState({ value: "Please Select a restaurant" });
  const [count, setCount] = useState(1);
  // let index = {index: 0};
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  // restaurantsList().then((data) => {
  //   console.log(data.error);
  //   if (data && data.error) {
  //     console.log(data.error);
  //   } else {
  //     setRestaurants(data);
  //   }
  // });

  useEffect(() => {
    //The signal read-only property of the AbortController returns an AbortSignal object,
    // which can be used to remove the event listener.
    const abortController = new AbortController();
    const signal = abortController.signal;

    restaurantsList(signal).then((data) => {
      console.log(data.error);
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
  }, []);
  const name = auth.isAuthenticated().user.name;
  const onChange = (e) => {
    console.log("restaurants changed");
    // console.log(e.target.value);
    setIndex(e.target.selectedIndex);
    // console.log(e.target.selectedIndex);
    setFruits({ value: e.target.value });
  };
  // console.log(restaurants.allRestaurants[index]);
  const clickSubmit = (e, id) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div>
      <Menu />
      <h1 className="text-5xl font-bold text-center my-10">Welcome {name}! </h1>
      <div className="flex items-center flex-col mb-6">
        <label className="text-2xl pb-6" htmlFor="restaurants">
          Select Restaurant:
        </label>
        <select
          name="restaurants"
          id="restaurants"
          className="text-2xl"
          // value={fruit.value}
          defaultValue={fruit.value}
          onChange={onChange}
        >
          {restaurants.allRestaurants &&
            restaurants.allRestaurants.map((restaurant, index) => (
              <option key={index} value={restaurant.name}>
                {restaurant.name}
              </option>
            ))}
        </select>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Food name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Add to Cart</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurants.allRestaurants &&
              restaurants.allRestaurants[index].menu.map((dish, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {dish.dish}
                  </th>
                  <td className="px-6 py-4">{dish.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={clickSubmit}
                      className="bg-transparent border-none p-0 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Add to cart
                      <Modal
                        title={dish.dish}
                        show={show}
                        onClose={() => setShow(false)}
                      >
                        <div className="flex justify-between">
                          <div className="flex justify-center items-center">
                            <AiFillMinusCircle size="1.5em" />
                            <span className="px-4 text-base">1</span>
                            <AiFillPlusCircle size="1.5em" />
                          </div>
                          <div>
                            <button className="px-6 py-4">Add to Order</button>
                          </div>
                        </div>
                      </Modal>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between  mt-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Place Order
        </button>
        <div>
          <span>Total: 3000 </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
