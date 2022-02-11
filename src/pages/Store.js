import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import { useSelector } from "react-redux";
const Store = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <div>
        {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
        <p>Store Page</p>
        {JSON.stringify(products)}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Store;
