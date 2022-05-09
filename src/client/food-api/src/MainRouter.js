import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminSignIn from "./components/adminComponents/logIn";
import AdminHome from "./components/adminComponents/Home";
import userSignIn from "./components/userComponents/LogIn";
import Home from "./components/Core/Home";
import userHome from "./components/userComponents/Home";
import Order from "./components/userComponents/Order";
import PrivateRoute from "./auth/PrivateRoute";
import PrivateAdminRoute from "./auth/PrivateAdminRoute";
import Error from "./components/Core/401";
import EditRestaurant from "./components/adminComponents/EditRestaurant";
import userSignUp from "./components/userComponents/signup";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signIn" component={userSignIn} />
      <Route path="/signup" component={userSignUp} />
      <Route path="/error" component={Error} />
      <Route path="/restaurant/edit/:restaurantId" component={EditRestaurant} />
      <PrivateRoute path="/user/home" component={userHome} />
      <PrivateRoute path="/user/order" component={Order} />

      <Route exact path="/admin" component={AdminSignIn} />
      <PrivateAdminRoute path="/admin/home" component={AdminHome} />
    </Switch>
  );
};
export default MainRouter;
