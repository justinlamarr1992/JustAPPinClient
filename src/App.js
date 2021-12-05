import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Store from "./pages/Store";

import NavBar from "./components/nav/NavBar";
import React from "react";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
