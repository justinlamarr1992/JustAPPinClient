import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { Navigate } from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";

// COME BACK TO THIS

// const UserRoute = ({ children }) => {
// const UserRoute = () => {
//   const { user } = useSelector((state) => ({ ...state }));
//   if (user) {
//     // console.log("I have no chidren");
//     // return <Navigate to="/login" />;
//     console.log("i have a user", user.email);
//   } else {
//     console.log("I have No user");
//   }
//   // return children;
//   return null;
// };

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Routes>
      <Route {...rest} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};
export default UserRoute;
