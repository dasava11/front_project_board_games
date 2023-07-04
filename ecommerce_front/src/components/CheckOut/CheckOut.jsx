import React, {useEffect, useState} from 'react'
import Paypal from '../Paypal/Paypal'
import MercadoPago from '../MercadoPago/MercadoPago'
import style from './CheckOut.module.css'

const CheckOut = () => {
    const [order , setOrder] = useState([])

    useEffect(() =>{
        setOrder(JSON.parse(localStorage.getItem("cart")))
    },[])

  return (
    <div className={style.checkOutcontainer}>
      <div className={style.checkOutCard}>
        <h1>Choose your payment method</h1>
          <MercadoPago
              order = {order}
          />
          <Paypal/>
      </div>
    </div>

  )
}

export default CheckOut