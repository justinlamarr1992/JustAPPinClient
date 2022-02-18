import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// replaced use history
import { useNavigate } from "react-router";
import { Menu, Image, Layout } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import Search from "../forms/Search";

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
  ShoppingOutlined,
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
      <Item>
        <Image className="float-start" preview={false} width={75} src={Logo} />
      </Item>
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="store" icon={<ShoppingCartOutlined />}>
        <Link to="/store">Store</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
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
          {user && user.role === "lead" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default NavBar;
