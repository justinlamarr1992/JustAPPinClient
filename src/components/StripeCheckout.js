import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createOrder, emptyUserCart } from "../functions/user";
import { createPaymentIntent } from "../functions/stripe";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import Logo from "../images/Logo.png";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, discount } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, discount).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // additional response recieved on Successful Paayment
      setCartTotal(res.data.cartTotal);

      setTotalAfterDiscount(res.data.totalAfterDiscount);

      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here yu get the result after success payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local Storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset discount to false
          dispatch({
            type: "DISCOUNT_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    //   listen for changes in the card element
    // display any errors as the customer types card details
    setDisabled(e.empty); //disables button if error
    setError(e.error ? e.error.message : ""); //show error message
  };

  const appearance = {
    theme: "flat",
  };
  const options = {
    clientSecret,
    appearance,
  };

  //   const cartStyle = {
  //     style: {
  //       base: {
  //         color: "#32325d",
  //         fontFamily: "Arial, sans-serif",
  //         fontSmoothing: "antialiased",
  //         fontSize: "16px",
  //         "::placeholder": {
  //           color: "#32325d",
  //         },
  //       },
  //       invalid: {
  //         color: "#fa755a",
  //         iconColor: "#fa755a",
  //       },
  //     },
  //   };

  return (
    <>
      {!succeeded && (
        <div>
          {discount && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No Discount applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={Logo}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={options}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>

        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.
          <Link to="/user/history">See it in your Purchased History</Link>
        </p>
      </form>
    </>
  );
};
export default StripeCheckout;
