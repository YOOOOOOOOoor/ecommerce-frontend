import React from "react";
import Add from "./seller/Add";
import VaE from "./seller/VaE";
import { useState } from "react";

const Seller = () => {
  const [refershKey, setRefreshKey] = useState(0);
  const refreshItem = async () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div className="Seller">
      <Add onSuccess={refreshItem} />
      <VaE refershKey={refershKey} />
    </div>
  );
};

export default Seller;
