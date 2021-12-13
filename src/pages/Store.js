import React from "react";

import { useSelector } from "react-redux";
const Store = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <p>Store Page</p>
      <p>{user._id}</p>
    </div>
  );
};
export default Store;
