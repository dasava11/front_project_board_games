import React, { useState } from "react";
import Instagram from "../../Photos/Instagram.svg";
import Faceboock from "../../Photos/Faceboock.svg";
import dados from "../../Photos/dados.png";
import style from "../Footer/Footer.module.css";
import { useSelector } from "react-redux";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const darkMode = useSelector((state) => state.darkMode);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    //Aquí iría la logica al momento de darle al boton de "Subscribe"
    alert("Subscribing email");
  };

  return (
    <footer
      className={
        darkMode === true ? style.darkFooterContainer : style.footerContainer
      }
    >
      <div className={style.upFooter}>
        <div className={style.footerSocial}>
          <h1>Follow Us</h1>
          <a
            href="https://www.instagram.com/hpartb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Instagram} alt="Instagram Logo" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100094509813076"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Faceboock} alt="Facebook Logo" />
          </a>
        </div>
        <div className={style.footerInput}>
          <h1>Subscribe to our newsletter</h1>
          <input type="email" value={email} onChange={handleEmailChange} />
          <button onClick={handleSubscribe} className={style.buttomFooter}>
            Subscribe
          </button>
        </div>
      </div>
      <div className={style.footerRights}>
        <h1>All rights reserved</h1>
        <img src={dados} alt="Logo" />
      </div>
    </footer>
  );
};
export default Footer;
