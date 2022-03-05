import React, { useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Card, Tabs, Tooltip } from "antd";
import Logo from "../../images/Logo.png";
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import RatingModal from "../modal/RatingModal";
import ProductListItems from "./ProductListItems";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";

import { toast } from "react-toastify";

const { Meta } = Card;
const { TabPane } = Tabs;

// this is the child component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click to Add");
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    //  create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage Get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({ ...product, count: 1 });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // same to localStorage
      // console.log("unique -->", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      // show Tooltip
      setTooltip("Added");
      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show car items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to Wishlist");
      navigate("/user/wishlist");
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-7">
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src={Logo}
                  style={{ height: "250px", objectFit: "contain" }}
                  className="mb-3 card-image"
                />
              }
            >
              {" "}
            </Card>
          )}
          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {description && description}
            </TabPane>
            <TabPane tab="More" key="2">
              Text to come soon
            </TabPane>
          </Tabs>
        </div>
        <div className="col-md-5">
          <h1 className="text-center p3">{title}</h1>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">No Rating Yet</div>
          )}

          <Card
            actions={[
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                  <>
                    <ShoppingCartOutlined className="text-danger" />
                    <br />

                    {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
                  </>
                </a>
              </Tooltip>,
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className="text-info" />
                <br />
                Add to Wishlist
              </a>,
              <RatingModal>
                <StarRatings
                  name={_id}
                  numberOfStars={5}
                  isSelectable={true}
                  starRatedColor="#00a4e1"
                  changeRating={onStarClick}
                  rating={star}
                />
              </RatingModal>,
            ]}
          >
            <ProductListItems product={product} />
          </Card>
        </div>
      </div>
    </>
  );
};
export default SingleProduct;
