import axios from "axios";

export const getDiscounts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/discounts`);

export const removeDiscount = async (discountId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/discount/${discountId}`, {
    headers: { authtoken },
  });

export const createDiscount = async (discount, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/discount`,
    { discount },
    { headers: { authtoken } }
  );
