import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Jumbotron from "../components/cards/Jumbotron";
import NewMerch from "../components/store/NewMerch";
import HotItems from "../components/store/HotItems";

const Store = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <div>
        <div className="Jumbotron text-danger h1 font-weight-bold text-center">
          <Jumbotron
            text={["Latest Products", "New Arrivals", "Best Sellers"]}
          />
        </div>
        <h4 className="text-center p-3 mt-5 mb-5 display-4 Jumbotron">
          New Merch
        </h4>
        <NewMerch />
        <h4 className="text-center p-3 mt-5 mb-5 display-4 Jumbotron">
          Hot Items
        </h4>
        <HotItems />
        <br />
        <br />
      </div>
    </div>
  );
};
export default Store;
