import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const UserRoutes = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  if (!user) {
    // console.log("I have no chidren");
    return <Navigate to="/login" />;
  }
  return children;
};
export default UserRoutes;
