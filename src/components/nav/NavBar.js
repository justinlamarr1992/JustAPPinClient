import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  let { user } = useSelector((state) => ({ ...state }));

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
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className=""
      // style={{
      //   backgroundColor: "00a3df",
      //   color: "#00a3df",
      // }}
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="store" icon={<ShoppingCartOutlined />}>
        <Link to="/store">Store</Link>
      </Item>
      {!user && (
        <Item key="register" className=" float-end" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className=" float-end">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="sub-menu"
          icon={<SettingOutlined />}
          // title={user.email && user.email.split("@")[0]}
          title={user.email && user.email.split("@")[0]}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
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
