import React from 'react'
import style from './MercadoPago.module.css'
import logo from '../../Photos/mercadoPago.png'
import axios from 'axios'

const mercadoPagoPost = import.meta.env.VITE_URL_MERCADOPAGO;

const MercadoPago = (props) => {
    const {order} = props
    const orderArray = []

    

    order.map(item =>{
        orderArray.push({
            title: item.name,
            unit_price: Number(item.price),
            quantity: Number(item.count)
        })
    })
    
    
    const handleOnClick = async() =>{
        const arrayItems = {
            items: orderArray
        }

        try {
            const response = await axios.post(mercadoPagoPost, arrayItems)

            window.location.href = response.data.init_point
        } catch (error) {
            alert(error.message)
        }
        

    }
  return (
    <button disabled={orderArray.length > 0 ? false : true} onClick={handleOnClick} className={orderArray.length > 0 ? style.botonMercadoPago : style.botonMercadoPagoDisabled}>
        <img src={logo} alt="mercado pago" width='20px' height='20px' />
        pagar con mercado pago
    </button>
  )
}

export default MercadoPago