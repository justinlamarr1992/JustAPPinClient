import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

// export const saveUserAddress = async (authtoken, address) =>
export const saveUserAddress = async (
  authtoken,
  street,
  street2,
  city,
  state,
  zip
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    // { address },
    { street },
    { street2 },
    { city },
    { state },
    { zip },
    // { address.street },
    // { address.street2 },
    // { address.city },
    // { address.state },
    // { address.zip },
    {
      headers: {
        authtoken,
      },
    }
  );
