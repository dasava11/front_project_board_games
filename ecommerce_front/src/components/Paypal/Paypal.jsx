import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPaymentButton = () => {
  const onSuccess = (data) => {
    // Acciones a realizar después de un pago exitoso
    console.log('Pago exitoso:', data);
    alert("Pago exitoso!")
  };

  return (
    <div>
      <h2>Realizar pago</h2>
      <PayPalScriptProvider options={{ 'client-id': 'AZF_WsZpFRtTjw6nRirMxga20RmU3isWNrl1BR_udWCxEtPh2MXQ0rXgPkAqAOnj5PHFWKckEsMmSnGm' }}>
        <PayPalButtons
          amount="10.00"
          currency="USD"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '10.00',
                  },
                },
              ],
            });
          }}
          onApprove={onSuccess}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPaymentButton;
