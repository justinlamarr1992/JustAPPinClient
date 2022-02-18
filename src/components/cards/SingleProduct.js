import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../images/Logo.png";
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import RatingModal from "../modal/RatingModal";
import ProductListItems from "./ProductListItems";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;
const { TabPane } = Tabs;

// this is the child component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

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
          )}{" "}
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
              <>
                <ShoppingCartOutlined className="text-success" />
                <br />
                Add to Cart
              </>,
              <Link to="/">
                <HeartOutlined className="text-info" />
                <br />
                Add to Wishlist
              </Link>,
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
