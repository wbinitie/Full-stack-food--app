import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCart, proceedToCheckOut } from "../userComponents/api-user";
import auth from "../../auth/auth-helper";
import Remove from "./Remove";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const SideBar = ({ refresh }) => {
  const alert = useAlert();

  const [showSidebar, setShowSidebar] = useState(false);
  const history = useHistory();

  const [subTotal, setSubTotal] = useState(0);
  const [newRefresh, setNewRefresh] = useState(false);
  const [state, setState] = useState([]);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getCart({ t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setState(data.cart.items);
        setSubTotal(data.cart.subTotal);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [jwt.token, subTotal, refresh, newRefresh]);
  const buttonRef = state && state.length === 0 ? true : false;
  const onClick = (e) => {
    e.preventDefault();
    proceedToCheckOut({ t: jwt.token }).then((data) => {
      alert.success("Order Placed");
      history.push("/order");
    });
  };
  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-10 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <AiOutlineShoppingCart
          size={"2em"}
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed text-[#032F8E] z-30 flex items-center cursor-pointer right-10 top-6"
        />
      )}
      <div
        className={`top-0 right-0 w-[35vw] bg-[#032F8E]  p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-500 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <h2 className="mt-10 text-center text-2xl font-semibold text-white">
          Shopping Cart
        </h2>
        <hr className="mt-3 text-gray-100" />
        {state && state.length === 0 ? (
          <div className="mt-20 text-xl text-center">
            Please add things to your Cart!
          </div>
        ) : null}

        <div>
          <ol>
            {state &&
              state.map((item, i) => (
                <li key={i}>
                  <div className="flex justify-between">
                    <div className="p-3">
                      <p>{item.foodName}</p>
                    </div>
                    <div className="flex items-center">
                      <strong className="my-2 px-5 text-[#3B9035] ">
                        ₦{item.price}
                      </strong>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Remove
                      foodId={item.foodId}
                      setNewRefresh={setNewRefresh}
                      newRefresh={newRefresh}
                    />
                    <div className="">Qty: {item.quantity}</div>
                  </div>

                  <hr className="mt-3 text-gray-100" />
                </li>
              ))}
          </ol>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClick}
            disabled={buttonRef}
            className={` text-white  px-6 py-3 ${
              buttonRef ? "bg-gray-400" : "bg-[#3B9035]"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
