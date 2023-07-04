import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./PurchaseSummary.module.css"

const PurchaseSummary = () => {
  const location = useLocation();
  const { newData } = location.state;

  return (
    <div className={styles.orderSummaryContainer}>
      <h1 className={styles.h1Purchase}>Resumen de la compra</h1>
      <ul className={styles.orderItemsList}>
        {newData.buys.map((item, index) => (
          <li key={index} className={styles.orderItem}>
            <p>Nombre: {item.name}</p>
            <p>Precio: {item.price}</p>
            <p>Cantidad: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseSummary;
