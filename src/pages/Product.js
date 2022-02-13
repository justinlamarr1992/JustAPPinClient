import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";

const Product = () => {
  const [product, setProduct] = useState({});

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <h4>Related Products</h4>
        </div>
      </div>
    </div>
  );
};
export default Product;
