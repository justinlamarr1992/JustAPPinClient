import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  // testing nested useStates

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  // Multiple set state test
  // const [address, setAddress] = useState("");
  // const [street, setStreet] = useState("");
  // const [street2, setStreet2] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [zip, setZip] = useState("");
  // Multiple set state test
  const [addressSaved, setAddressSaved] = useState(false);

  let address = {
    street: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
  };
  let { street, street2, city, state, zip } = address;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  // destructured address test
  const addressUpdate = (e) => {
    address.street = e.target.value;
    console.log(address.street);
  };
  const aptUpdate = (e) => {
    address.street2 = e.target.value;
    console.log(address.street2);
  };
  const cityUpdate = (e) => {
    address.city = e.target.value;
    console.log(address.city);
  };
  const stateUpdate = (e) => {
    address.state = e.target.value;
    console.log(address.state);
  };
  const zipUpdate = (e) => {
    address.zip = e.target.value;
    console.log(address.zip);
  };

  const saveAddressToDb = (e) => {
    e.preventDefault();
    console.log(street);
    console.log(street2);
    console.log(city);
    console.log(state);
    console.log(zip);
    console.log(address);

    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address Saved");
        }
      })
      .catch((err) => console.log(err));
  };

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart has been Emptied. Continue Shopping");
    });
  };
  return (
    <div className="row">
      <div className="col-md-8">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <form>
          <label>Address: </label>
          <input
            required
            type="text"
            name="street"
            value={address.street}
            // value="Street"
            onChange={addressUpdate}
          />
          <label>Apt. Number: </label>
          <input
            type="text"
            name="street2"
            value={address.street2}
            onChange={aptUpdate}
          />
          <label>City: </label>
          <input
            required
            type="text"
            name="city"
            value={address.city}
            onChange={cityUpdate}
          />
          <label>State: </label>
          <input
            required
            type="text"
            name="state"
            value={address.state}
            onChange={stateUpdate}
          />
          <label>Zip: </label>
          <input
            required
            type="Number"
            name="zip"
            value={address.zip}
            onChange={zipUpdate}
          />
          <button type="submit" onClick={saveAddressToDb}>
            Lets see
          </button>
        </form>
        <hr />
        <h4>Discounts</h4>
        <br />
        Coupon Input and Apply Button
      </div>
      <div className="col-md-4">
        <h4>Order Summary</h4>
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) * {p.count} = $
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: ${total}</p>
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!products.length}
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
