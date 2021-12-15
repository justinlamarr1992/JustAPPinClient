import React, { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../../functions/auth";

// COME BACK TO THIS

// first one
// const AdminRoute = ({ children }) => {
// const AdminRoute = () => {
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

// second
// const AdminRoute = ({ children, ...rest }) => {
//   const [ok, setOk] = useState(false);
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     if (user && user.token) {
//       currentAdmin(user.token)
//         .then((res) => {
//           console.log("CURRENT ADMIN RES", res);
//           setOk(true);
//         })
//         .catch((err) => {
//           console.log("ADMIN ROUTE ERROR", err);
//           setOk(false);
//         });
//     }
//   }, [user]);

//   return ok ? (
//     <Routes>
//       <Route {...rest} />
//     </Routes>
//   ) : (
//     <LoadingToRedirect />
//   );
// };

// third

const authContext = createContext();
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
          console.log("ADMIN ROUTE ERROR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Routes>
      <Route {...rest} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
