import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Menu } from "antd";
import { Link } from "react-router-dom";

// ERROR MAY COME FROM HERE
import firebase from "firebase/compat";

import {
  HomeOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const NavBar = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };
  return (
    // find out if there is a div here
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="store" icon={<ShoppingCartOutlined />}>
        <Link to="/store">Store</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />} className="float-end">
        <Link to="/register">Register</Link>
      </Item>
      <Item key="login" icon={<LoginOutlined />} className="float-end">
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
    </Menu>
    // <div className="nav d-flex justify-content-between">
    //   <Link className="nav-link" to="/">
    //     Home
    //   </Link>
    //   <Link className="nav-link" to="/store">
    //     Store
    //   </Link>

    /* Setup to have these only if the user is not signed in */

    //   <Link className="nav-link" to="/login">
    //     Login
    //   </Link>
    //   <Link className="nav-link" to="/register">
    //     Register
    //   </Link>
    // </div>
  );
};

export default NavBar;
