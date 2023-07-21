import { useNavigate } from "react-router-dom";
import style from "./MercadoPagoSuccess.module.css";
import successGif from "../../../Photos/success-purchase.gif";

export default function MercadoPagoSuccess() {
  const navigate = useNavigate();
  return (
    <div className={style.mpSuccessContainer}>
      <h1>Thanks for buying!</h1>
      <img src={successGif} alt="success gif" className={style.mpSuccessImg} />
      <button onClick={() => navigate("/games")} className={style.mpSuccessBtn}>
        See more games
      </button>
    </div>
  );
}
