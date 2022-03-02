export const discountReducer = (state = false, action) => {
  switch (action.type) {
    case "DISCOUNT_APPLIED":
      return action.payload;
    default:
      return state;
  }
};
