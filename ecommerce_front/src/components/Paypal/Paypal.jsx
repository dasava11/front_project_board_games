import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import styles from './Paypal.module.css';

const PayPalPaymentButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, buys } = location.state;
  const [showSummary, setShowSummary] = useState(false);
  const [orderId, setOrderId] = useState('');

  const onSuccess = (data) => {
    const newData = { ...data, buys };
    console.log('Pago exitoso:', newData);
    setOrderId(newData.orderID);
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    navigate('/cart'); 
  };

  return (
    <div className={styles.paypalContainer}>
      <h1 className={styles.pago}>Realizar pago</h1>
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
            <h1 className={styles.h1Purchase}>Resumen de la compra</h1>
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
