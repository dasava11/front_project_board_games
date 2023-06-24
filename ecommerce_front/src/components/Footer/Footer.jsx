import React from 'react'
import Instagram  from '../../Photos/Instagram.svg';
import Faceboock from '../../Photos/Faceboock.svg'
import dados from '../../Photos/dados.png'
import style from '../Footer/Footer.module.css'

function Footer() {
  return (
    <footer className={style.footerContainer}>
      <div className={style.upFooter}>
        <div className={style.footerSocial}>
          <h1>Follow Us</h1>
          <img src={Instagram} alt="Instagram Logo" />
          <img src={Faceboock} alt="Facebook Logo" />
        </div>
        <div className={style.footerInput}>
          <h1>subscribe to our newsletter</h1>
          <input type="email" />
        </div>
      </div>
      <div className={style.footerRights}>
        <h1>all rights reserved</h1>
        <img src={dados} alt="Logo" />
      </div>
    </footer>
  )
}

export default Footer
