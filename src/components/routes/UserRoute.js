import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { Navigate } from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";

// COME BACK TO THIS

// const UserRoute = ({ children, ...rest }) => {
//   const { user } = useSelector((state) => ({ ...state }));

//   return user && user.token ? (
//     <Routes>
//       <Route {...rest} />
//     </Routes>
//   ) : (
//     <LoadingToRedirect />
//   );
// };

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
};

export default UserRoute;
