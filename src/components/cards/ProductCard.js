import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
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
          <>
            <ShoppingCartOutlined className="text-danger" />
            <br />
            Add to Cart
          </>,
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
