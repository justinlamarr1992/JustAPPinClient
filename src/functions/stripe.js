import axios from "axios";

export const createPaymentIntent = (authtoken, discount) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { discountApplied: discount },
    {
      headers: {
        authtoken,
      },
    }
  );
