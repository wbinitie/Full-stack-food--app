import Menu from "../Core/Menu";
import { useAlert } from "react-alert";
import auth from "../../auth/auth-helper";
import { restaurantsList, addToCart } from "./api-user";
import React, { useState, useEffect } from "react";
import Modal from "../Core/Modal";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import bgImage from "../../assets/5.jpg";

const Home = () => {
  const jwt = auth.isAuthenticated();
  const alert = useAlert();
  const [restaurants, setRestaurants] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [fruit, setFruits] = useState({ value: "Please Select a restaurant" });
  const [order, setOrder] = useState({
    name: "",
    quantity: 1,
    foodId: "",
    error: "",
    message: "",
  });
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

  const clickSubmitOrder = (e) => {
    e.preventDefault();
    const { foodId, quantity } = order;
    const newOrder = {
      foodId: foodId || undefined,
      quantity: quantity || undefined,
    };
    addToCart(newOrder, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        setOrder({ ...order, error: data.error });
        alert.error("Error");
      } else {
        setOrder({ ...order, message: data.message });
        setRefresh(!refresh);
        alert.success("Added to cart");
        setOrder({ ...order, quantity: 1 });
      }
    });
    setShow(false);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right bottom, #00000080 , #00000080),url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="font-Merriweather"
    >
      <Menu refresh={refresh} />
      <h1 className="text-5xl text-white font-bold text-center my-10">
        Welcome {name}!{" "}
      </h1>
      <div className="flex items-center  flex-col mb-6">
        <label
          className="text-2xl font-light text-gray-200 pb-6"
          htmlFor="restaurants"
        >
          Select Restaurant:
        </label>
        <select
          name="restaurants"
          id="restaurants"
          className="text-2xl rounded-lg"
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
      <div className="relative flex justify-center overflow-x-auto shadow-md sm:rounded-lg w-[100%] rounded-lg">
        <table className="w-[98%]  text-left  text-gray-500 ">
          <thead className="text-base text-gray-700 uppercase bg-white ">
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
                <tr key={index} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-lg  text-gray-900 whitespace-nowrap"
                  >
                    {dish.dish}
                  </th>
                  <td className="px-6 py-4">{dish.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                        setOrder({
                          ...order,
                          name: dish.dish,
                          foodId: dish._id,
                        });
                      }}
                      className="bg-transparent border-none p-0 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Add to cart
                      <Modal
                        title={order.name}
                        show={show}
                        onClose={() => setShow(false)}
                      >
                        <div className="flex justify-between">
                          <div className="flex justify-center items-center">
                            <AiFillMinusCircle
                              size="1.5em"
                              onClick={(e) => {
                                e.preventDefault();
                                setOrder({
                                  ...order,
                                  quantity: order.quantity - 1,
                                });
                              }}
                            />
                            <span className="px-4 text-base">
                              {order.quantity}
                            </span>
                            <AiFillPlusCircle
                              size="1.5em"
                              onClick={(e) => {
                                e.preventDefault();
                                setOrder({
                                  ...order,
                                  quantity: order.quantity + 1,
                                });
                              }}
                            />
                          </div>
                          <div>
                            <div
                              onClick={clickSubmitOrder}
                              className="px-6 py-4"
                            >
                              Add to Order
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </button>
                  </td>
                  <hr />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
