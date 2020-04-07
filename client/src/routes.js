import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import Home from "./components/Home/home";
import Register from "./components/Register/register";

const customRoutes = () => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/private" exact component={Home} />
        <Route path="/" exact component={Register} />
      </Switch>
    </>
  );
};

export default customRoutes;
