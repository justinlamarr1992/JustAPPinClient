import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// replaced use history
import { useNavigate } from "react-router";
import { Menu, Image, Layout, Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";
import Search from "../forms/Search";

// ERROR MAY COME FROM HERE
import firebase from "firebase/compat";

import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  SkinOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const NavBar = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user, cart } = useSelector((state) => ({ ...state }));

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
    <header class="" id="myNavBar">
      <div class="header-container navbar">
        <a href="#hero" class="active logo">
          <Link to="/">
            <Image
              className="float-start"
              preview={false}
              width={75}
              src={Logo}
            />
          </Link>
        </a>
        <a href="#" class="toggle-button">
          <i class="fa fa-bars fa-2x"></i>
        </a>
        <nav class="navbar-links">
          <ul class="nav-links">
            <li>
              <Link to="/store">E-Commerce Home</Link>
            </li>
            <li>
              <Link to="/shop">Products Page</Link>
            </li>
            <li>
              <Link to="/cart">
                <Badge count={cart.length} offset={[9, 0]}>
                  Shopping Cart
                </Badge>
              </Link>
            </li>
            <li>
              {!user && (
                <Link key="login" className=" float-end" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li>
              {!user && (
                <Link key="register" className=" float-end" to="/register">
                  Register
                </Link>
              )}
            </li>
            <li>
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
            </li>
            <li>
              <h3 onClick={logout}>LogOut</h3>
            </li>
          </ul>
        </nav>
        <a class="header-cta-button" href="#cta">
          <button>Contact Us</button>
        </a>
      </div>
    </header>
    // <Menu
    //   onClick={handleClick}
    //   selectedKeys={[current]}
    //   mode="horizontal"
    //   className=""
    //   // style={{
    //   //   backgroundColor: "00a3df",
    //   //   color: "#00a3df",
    //   // }}
    // >
    //   <Item>
    //     <Image className="float-start" preview={false} width={75} src={Logo} />
    //   </Item>
    //   <Item key="home" icon={<HomeOutlined />}>
    //     <Link to="/">Home</Link>
    //   </Item>

    //   <Item key="store" icon={<SkinOutlined />}>
    //     <Link to="/store">Store Page</Link>
    //   </Item>
    //   <Item key="shop" icon={<ShoppingOutlined />}>
    //     <Link to="/shop">Shop</Link>
    //   </Item>
    //   <Item key="cart" icon={<ShoppingCartOutlined />}>
    //     <Link to="/cart">
    //       <Badge count={cart.length} offset={[9, 0]}>
    //         Cart
    //       </Badge>
    //     </Link>
    //   </Item>

    //   {!user && (
    //     <Item key="register" className=" float-end" icon={<UserAddOutlined />}>
    //       <Link to="/register">Register</Link>
    //     </Item>
    //   )}

    //   {!user && (
    //     <Item key="login" icon={<UserOutlined />} className=" float-end">
    //       <Link to="/login">Login</Link>
    //     </Item>
    //   )}

    //   {user && (
    //     <SubMenu
    //       key="sub-menu"
    //       icon={<SettingOutlined />}
    //       // title={user.email && user.email.split("@")[0]}
    //       title={user.email && user.email.split("@")[0]}
    //     >
    //       {user && user.role === "lead" && (
    //         <Item>
    //           <Link to="/user/history">Dashboard</Link>
    //         </Item>
    //       )}
    //       {user && user.role === "admin" && (
    //         <Item>
    //           <Link to="/admin/dashboard">Dashboard</Link>
    //         </Item>
    //       )}
    //       <Item icon={<LogoutOutlined />} onClick={logout}>
    //         Logout
    //       </Item>
    //     </SubMenu>
    //   )}
    //   <span className="float-right p-1">
    //     <Search />
    //   </span>
    // </Menu>
  );
};

export default NavBar;
