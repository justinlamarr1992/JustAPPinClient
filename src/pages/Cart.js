import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userCart } from "../functions/user";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Article of Clothing</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h4>Cart / {cart.length} Products</h4>
        {!cart.length ? (
          <p>
            No Products in Cart <Link to="/shop">Continue Shopping</Link>
          </p>
        ) : (
          showCartItems()
        )}
        {/* {JSON.stringify(cart)} */}
      </div>
      <div className="col-md-4">
        <h4>Order Summary</h4>
        <hr />
        <p>Products</p>
        {cart.map((c, i) => (
          <div key={i}>
            <p>
              {c.title} * {c.count} = ${c.price * c.count}
            </p>
          </div>
        ))}
        <hr />
        Total: <b>${getTotal()}</b>
        <br />
        {user ? (
          <button
            onClick={saveOrderToDb}
            disabled={!cart.length}
            className="btn-btn-sm btn-primary mt-2"
          >
            Proceed to Checkout
          </button>
        ) : (
          <button className="btn-btn-sm btn-primary mt-2">
            <Link to={{ pathname: "/login", state: { from: "cart" } }}>
              Login to Checkout
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};
export default Cart;
