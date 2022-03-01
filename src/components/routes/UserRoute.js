import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
// const UserRoute = ({ children }) => {
//   //access auth from state
//   const { user } = useSelector((state) => ({ ...state }));
//   console.log(user.userState);
//   return user && user.userState && user.userState.token ? (
//     children
//   ) : (
//     <Navigate to="/login" />
//   );
// };
// export default UserRoute;

// const UserRoute = ({ children }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   if (!user && user.token) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// const PrivateRoute = ({ children }) => {
//   //access auth from state
//   const { auth } = useSelector((state) => ({ ...state }));
//   //   console.log(auth.userState);
//   return auth && auth.userState && auth.userState.token ? (
//     children
//   ) : (
//     <Navigate to="/login" />
//   );
// };
//  export default PrivateRoute;

export default UserRoute;
