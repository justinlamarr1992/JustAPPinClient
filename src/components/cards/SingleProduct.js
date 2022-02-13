import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../images/Logo.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductListItems from "./ProductListItems";

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description } = product;

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
            <Card cover={<img src={Logo} className="mb-3 card-image" />}>
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

          <Card
            action={[
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
