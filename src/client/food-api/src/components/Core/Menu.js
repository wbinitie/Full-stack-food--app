import React from "react";
import logo from "../../assets/Logo.png";
import auth from "../../auth/auth-helper";
import { withRouter, Link } from "react-router-dom";
import SideBar from "../Core/SideBar";
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ffa726" };
  else return { color: "#ffffff" };
};

const Menu = withRouter(({ history, refresh }) => (
  <nav style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
    <ul className="flex justify-between text-xl py-8 px-8 md:px-48 font-Merriweather font-light  ">
      <li>
        <img src={logo} alt="logo" />{" "}
      </li>
      <li>
        <div className="flex sm:justify-center fond-bold">
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <button
                  className="px-2 py-2 sm:px-8 bg-[#032F8E] text-white rounded-md mr-4"
                  style={isActive(history, "/signup")}
                >
                  Sign Up
                </button>
              </Link>

              <Link to="/signin">
                <button
                  className="px-2 py-2 sm:px-8 bg-[#032F8E] text-white rounded-md"
                  style={isActive(history, "/signin")}
                >
                  Sign In
                </button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <button
                  className="px-2 py-2 mr-3 sm:px-8 bg-[#032F8E] text-white rounded-md"
                  style={isActive(
                    history,
                    `/user/${auth.isAuthenticated().user._id}`
                  )}
                >
                  My Profile
                </button>
              </Link>
              <button
                className="px-2 py-2 text-white rounded-md"
                onClick={() => {
                  auth.clearJWT("users", () => {
                    history.push("/");
                  });
                }}
              >
                Sign Out
              </button>
              <SideBar refresh={refresh} />
            </span>
          )}
        </div>
      </li>
    </ul>
  </nav>
));

export default Menu;
