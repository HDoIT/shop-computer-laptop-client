import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const AdminRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  let history = useHistory();

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              // return <Redirect to="/login" />;
              history.push("/login");
            }

            //Nếu user.role === admin hoặc staff thì về login
            if (isAdmin === true && user.role !== "admin") {
              // return <Redirect to="/login" />;
              if (user.role !== "staff") {
                history.push("/login");
              }
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default AdminRoute;
