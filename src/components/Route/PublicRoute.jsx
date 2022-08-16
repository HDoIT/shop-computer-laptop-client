import React from "react";
import DefaultLayout from "../Layout";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <DefaultLayout>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </DefaultLayout>
  );
};

export default PublicRoute;
