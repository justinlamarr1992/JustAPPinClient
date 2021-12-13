import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Store from "./pages/Store";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";

import NavBar from "./components/nav/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();
  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          )
          .catch((err) => console.log(err));
      }
    });
    //clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar style={{ position: "sticky", zIndex: 1, width: "100%" }} />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/store" element={<Store />} />

        {/* temp for design */}
        {/* <Route path="/user/history" element={<History />} />
        <Route path="/user/password" element={<Password />} />
        <Route path="/user/wishlist" element={<Wishlist />} /> */}
        {/* same */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        <Route
          path="/user/password"
          element={
            <UserRoute>
              <Password />
            </UserRoute>
          }
        />
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <Wishlist />
            </UserRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
