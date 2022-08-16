import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import DefaultLayout from "../Layout";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  let history = useHistory();

  return (
    <DefaultLayout>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              // return <Redirect to="/login" />;
              history.push("/login");
            }

            return <Component {...props} />;
          }}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute;
