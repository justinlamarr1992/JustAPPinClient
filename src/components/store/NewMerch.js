import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import { useSelector } from "react-redux";
import Jumbotron from "../cards/Jumbotron";
import LoadingCard from "../cards/LoadingCard";

const NewMerch = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    // acending = asc, decending = desc
    getProducts("createdAt", "desc", 4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="container">
        {" "}
        {loading ? (
          <LoadingCard count={4} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default NewMerch;
