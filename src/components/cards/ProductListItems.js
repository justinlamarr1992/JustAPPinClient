import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, article, quantity, sold } =
    product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill float-end">
          {" "}
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Article of Clothing{" "}
        <span className="label label-default label-pill float-end">
          {" "}
          {article}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Icon{" "}
          <Link to={`/category/${category.slug}`} className=" label float-end">
            {category.name}
          </Link>
        </li>
      )}
      {subs && (
        <li className="list-group-item">
          SubCategories{" "}
          {subs.map((s) => (
            <Link key={s._id} to={`/sub/${s.slug}`} className="label float-end">
              {s.name}
            </Link>
          ))}
        </li>
      )}
      <li className="list-group-item">
        In stock{" "}
        <span className="label label-default label-pill float-end">
          {" "}
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill float-end">
          {" "}
          {sold}
        </span>
      </li>
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill float-end">
          {" "}
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill float-end">
          {" "}
          ${price}
        </span>
      </li>
    </ul>
  );
};
export default ProductListItems;
