import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminSignIn from "./components/adminComponents/logIn";
import AdminHome from "./components/adminComponents/Home";
import userSignIn from "./components/userComponents/LogIn";
import Home from "./components/Core/Home";
import userHome from "./components/userComponents/Home";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signIn" component={userSignIn} />
      <Route path="/user/home" component={userHome} />
      <Route path="/admin" component={AdminSignIn} />
      <Route path="/admin/home" component={AdminHome} />
    </Switch>
  );
};
export default MainRouter;
