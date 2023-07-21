import React, {useEffect, useState} from 'react'
import Paypal from '../Paypal/Paypal'
const PAYPAL_TOKEN = import.meta.env.VITE_PAYPAL_TOKEN;
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import MercadoPago from '../MercadoPago/MercadoPago'
import style from './CheckOut.module.css'

const CheckOut = () => {
    const [order , setOrder] = useState([])

    useEffect(() =>{
        setOrder(JSON.parse(localStorage.getItem("cart")))
    },[])

  return (
    <div className={style.checkOutcontainer}>
      <PayPalScriptProvider
        options={{
          "client-id": PAYPAL_TOKEN,
        }}
      >
      <div className={style.checkOutCard}>
        <h1>Choose your payment method</h1>
          <MercadoPago
              order = {order}
          />
          <Paypal/>
      </div>
      </PayPalScriptProvider>
    </div>

  )
}

export default CheckOut