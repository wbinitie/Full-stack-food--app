import React, { useEffect, useState } from "react";
import auth from "../../auth/auth-helper";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";

import { getRestaurant, updateFood, addFood, deleteFood } from "./admin-api";
import Modal from "../Core/Modal";
import bgImage from "../../assets/6.jpg";

const EditRestaurant = ({ match }) => {
  let history = useHistory();
  const jwt = auth.isAuthenticated();
  const alert = useAlert();

  const [restaurant, setRestaurant] = useState({});
  const [food, setFood] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getRestaurant(
      {
        restaurantId: match.params.restaurantId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRestaurant(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [
    match.params.restaurantId,
    jwt.token,
    setRestaurant,
    food.id,
    open,
    close,
  ]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value });
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right bottom, #00000080 , #00000080),url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="font-Merriweather relative"
    >
      <Modal
        title={"Add new Food"}
        show={close}
        onClose={() => setClose(false)}
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
            value={food.name}
            onChange={handleChange}
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            value={food.price}
            onChange={handleChange}
          />
          <div className="flex justify-between mt-2">
            <div
              onClick={(e) => {
                e.preventDefault();
                const newFood = {
                  dish: food.name || undefined,
                  price: food.price || undefined,
                };
                addFood(
                  newFood,
                  {
                    restaurantId: match.params.restaurantId,
                  },
                  { t: jwt.token }
                ).then((data) => {
                  if (data && data.error) {
                    console.log(data.error);
                  } else {
                    alert.success("New Food added");
                    setClose(false);
                  }
                });
              }}
              className="px-2 py-1 mt-2 bg-[#032F8E]  rounded-md text-white"
            >
              Add Food
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-row flex-1 mb-20">
        <button
          onClick={history.goBack}
          className="px-6 py-3 absolute top-5 left-3 text-base text-white rounded-md bg-[#032F8E] mr-4"
        >
          <span className="flex ">
            <div className="flex items-center">
              <AiOutlineArrowLeft />
            </div>
            <p>Go back</p>
          </span>
        </button>
        <div className="absolute left-[42%]">
          <h1 className="text-center text-yellow-50 pt-5 text-4xl">
            {restaurant.name}
          </h1>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            setClose(true);
            setFood({
              id: "",
              name: "",
              price: "",
            });
          }}
          className="px-2 py-2 bg-[#032F8E]  rounded-md text-white"
        >
          Add Food ➕
        </button>
      </div>
      <div className="flex justify-center mt-5">
        <div className="bg-black rounded-lg border border-gray-200 w-96 text-gray-900">
          {restaurant.menu &&
            restaurant.menu.map((menu, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                  setFood({ name: menu.dish, id: menu._id, price: menu.price });
                }}
                aria-current="true"
                className="block my-2 px-6 py-2 border-b border-gray-200 w-full rounded-lg bg-blue-600 text-white cursor-pointer "
              >
                {menu.dish}
                <Modal
                  title={"Edit Food 🛠️"}
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
                      value={food.name}
                      onChange={handleChange}
                    />
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      name="price"
                      value={food.price}
                      onChange={handleChange}
                    />
                    <div className="flex justify-between mt-2">
                      <div
                        onClick={() => {
                          deleteFood(
                            { foodId: food.id },
                            { t: jwt.token }
                          ).then((data) => {
                            if (data && data.error) {
                              console.log(data.error);
                            } else {
                              setOpen(!open);
                              alert.success("Food deleted ");
                            }
                          });
                        }}
                        className="px-2 py-1 mt-2 bg-[#032F8E]  rounded-md text-white"
                      >
                        Delete Food ❌
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          const updatedFood = {
                            dish: food.name || undefined,
                            price: food.price || undefined,
                          };
                          updateFood(
                            updatedFood,
                            { foodId: food.id },
                            { t: jwt.token }
                          ).then((data) => {
                            if (data.error) {
                              console.log(data.error);
                            } else {
                              alert.success("Food Updated");
                              setOpen(!open);
                            }
                          });
                        }}
                        className="px-2 flex items-center py-1 mt-2 bg-[#032F8E]  rounded-md text-white"
                      >
                        Update Food{"  "}
                        <span>
                          <GrUpdate />
                        </span>
                      </div>
                    </div>
                  </div>
                </Modal>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EditRestaurant;
