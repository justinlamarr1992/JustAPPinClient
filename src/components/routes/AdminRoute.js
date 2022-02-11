import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
    ok ? (
      <Routes>
        <Route {...rest} />
      </Routes>
    ) : (
      <LoadingToRedirect />
    );
  }, [user]);

  return children;
};

export default AdminRoute;
