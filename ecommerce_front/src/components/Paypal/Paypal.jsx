import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';

import style from '../Paypal/Paypal.module.css';

const PayPalPaymentButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, buys } = location.state;

  const onSuccess = (data) => {
    // Acciones después de un pago exitoso
    const newData = { ...data, buys };
    console.log('Pago exitoso:', newData);
    
    navigate('/cart');
    alert("Pago exitoso!");
  };

  return (
    <div className={style.paypalContainer}>
      <h1 className={style.pago}>Realizar pago</h1>
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
    </div>
  );
};

export default PayPalPaymentButton;
