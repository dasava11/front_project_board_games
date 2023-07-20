import React, { useState } from "react";
import { useAuth } from "../Auth/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import styles from "./Paypal.module.css";
import axios from "axios";

const VITE_URL_PAYPAL = import.meta.env.VITE_URL_PAYPAL;

const PayPalPaymentButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAuth } = useAuth();
  const { amount, buys } = location.state;
  const [showSummary, setShowSummary] = useState(false);
  const [orderId, setOrderId] = useState("");

  const onSuccess = async () => {
    const newData = {
      games: buys.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      user_id: userAuth.uid,
      total_amount: amount,
    };

    try {
      await axios.post(VITE_URL_PAYPAL, newData);
      setShowSummary(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    navigate("/games");
  };

  return (
    <div className={styles.paypalContainer}>
      <div>
        <PayPalButtons
          amount={amount}
          currency="USD"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={onSuccess}
        />
      </div>
      {showSummary && (
        <div className={styles.summaryModal}>
          <div className={styles.summaryContent}>
            <h2 className={styles.h1Purchase}>Resumen de la compra</h2>
            <h3 className={styles.orderID}>Order Id: {orderId}</h3>
            <ul>
              {buys.map((item, index) => (
                <li key={index}>
                  <p>Nombre: {item.name}</p>
                  <p>Precio: {item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                </li>
              ))}
            </ul>
            <h1>Total: {amount} $</h1>
            <button className={styles.closeButton} onClick={handleCloseSummary}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayPalPaymentButton;
