import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // redux
  // const { user, cart } = useSelector((state) => ({ ...state }));
  const { user } = useSelector((state) => ({ ...state }));
  const cart = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Click to Add");

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
      console.log("unique -->", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      // show Tooltip
      setTooltip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  const { images, title, description, slug, price } = product;
  const gridStyle = {
    width: "50%",
    textAlign: "left",
  };
  const gridStyle2 = {
    width: "50%",
    textAlign: "center",
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No Ratings Yet</div>
      )}
      <Card
        hoverable={true}
        cover={
          <img
            src={images && images.length ? images[0].url : Logo}
            style={{ height: "250px", objectFit: "contain" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br />
            View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
              </>
            </a>
          </Tooltip>,
        ]}
      >
        <div className="productCard">
          <div className="productCard-title">
            <h4>{`${title}`}</h4>
          </div>
          <div className="productCard-description">{`${
            description && description.substring(0, 40)
          }...`}</div>
          {/* TODO: HAve tese shimerer random colors of log */}
          <div className="productCard-price">
            <h4>{` $${price}`}</h4>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
