import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const NavBar = () => {
  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };
  return (
    // find out if there is a div here
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="float-end"
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="store" icon={<ShoppingCartOutlined />}>
        <Link to="/store">Store</Link>
      </Item>
      <Item key="login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
      <Item key="username" icon={<UserOutlined />}>
        UserName
      </Item>
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
