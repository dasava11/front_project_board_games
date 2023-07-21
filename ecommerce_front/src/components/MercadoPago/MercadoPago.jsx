import React from "react";
import { useAuth } from "../Auth/authContext";
import style from "./MercadoPago.module.css";
import { toast } from "react-toastify";
import logo from "../../Photos/mercadoPago.png";
import axios from "axios";

const mercadoPagoPost = import.meta.env.VITE_URL_MERCADOPAGO;

const MercadoPago = ({ order }) => {
  const { userAuth } = useAuth();

  const orderArray = order.map((item) => ({
    title: item.name,
    unit_price: Number(item.price),
    quantity: Number(item.count),
  }));

  const handleOnClick = async () => {
    const arrayItems = {
      items: orderArray,
      user_id: userAuth.uid,
    };

    try {
      const response = await axios.post(mercadoPagoPost, arrayItems);

      window.location.href = response.data.init_point;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <button
      disabled={orderArray.length > 0 ? false : true}
      onClick={handleOnClick}
      className={
        orderArray.length > 0
          ? style.botonMercadoPago
          : style.botonMercadoPagoDisabled
      }
    >
      <img src={logo} alt="mercado pago" width="20px" height="20px" />
      pay with mercado pago
    </button>
  );
};

export default MercadoPago;
