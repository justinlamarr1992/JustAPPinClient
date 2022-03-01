import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  // const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  // address destructure
  // const { street, street2, city, state, zip } = address;

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
  const addressUpdate = (e) => {
    setStreet(e.target.value);
    console.log(setStreet);
  };
  const aptUpdate = (e) => {
    setStreet2(e.target.value);
    console.log(setStreet2);
  };
  const cityUpdate = (e) => {
    setCity(e.target.value);
    console.log(setCity);
  };
  const stateUpdate = (e) => {
    setState(e.target.value);
    console.log(setState);
  };
  const zipUpdate = (e) => {
    setZip(e.target.value);
    console.log(setZip);
  };

  const saveAddressToDb = () => {
    console.log(street);
    console.log(street2);
    console.log(city);
    console.log(state);
    console.log(zip);
    // console.log(address);
    // console.log(address.street);
    // console.log(address.street2);
    // console.log(address.city);
    // console.log(address.state);
    // console.log(address.zip);
    // tis is where should think about diff parts of address
    // saveUserAddress(user.token, address).then((res) => {
    saveUserAddress(user.token, street, street2, city, state, zip).then(
      (res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address Saved");
        }
      }
    );
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
        {/* This will be the different inputs */}
        {/* <ReactQuill theme="snow" value={address} onChange={setAddress} /> */}
        <form>
          <label>Address: </label>
          <input required type="text" onChange={addressUpdate} />
          <label>Apt. Number: </label>
          <input type="text" onChange={aptUpdate} />
          <label>City: </label>
          <input required type="text" onChange={cityUpdate} />
          <label>State: </label>
          <input required type="text" onChange={stateUpdate} />
          <label>Zip: </label>
          <input required type="Number" onChange={zipUpdate} />
          <button onClick={saveAddressToDb}>Lets see</button>
        </form>
        {/* <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>  */}
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
