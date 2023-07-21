import React, { useEffect, useState } from "react";
import axios from "axios";

const VITE_URL_PAYPAL = import.meta.env.VITE_URL_PAYPAL;

const UserPurchases = ({ user }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(VITE_URL_PAYPAL);
        const userPurchases = res.data.filter(
          (p) => p.user_id === user.user_id
        );

        setPurchases(userPurchases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      {purchases.map((item) => (
        <div>
          <h1>{item.description[0].name}</h1>
          <h2>{item.description[0].price}</h2>
          <h3>{item.description[0].quantity}</h3>
        </div>
      ))}
    </div>
  );
};

export default UserPurchases;
