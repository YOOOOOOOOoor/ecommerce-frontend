import React from "react";
import Add from "./seller/Add";
import VaE from "./seller/VaE";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Seller = ({ user }) => {
  const navigate = useNavigate();
  const [refershKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) {
      toast.error("You are not logged in.");

      navigate("/login");
    }
  }, [user]);
  const refreshItem = async () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div className="Seller">
      <Add onSuccess={refreshItem} user={user} />
      <VaE refershKey={refershKey} user={user} />
    </div>
  );
};

export default Seller;
