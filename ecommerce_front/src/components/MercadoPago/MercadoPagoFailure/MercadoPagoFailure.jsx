import { useNavigate } from "react-router-dom";
import style from "./MercadoPagoFailure.module.css";

export default function MercadoPagoFailure() {
  const navigate = useNavigate();
  return (
    <div className={style.mpFailureContainer}>
      <h1>Something were wrong. Do not worry, try again!</h1>
      <button onClick={() => navigate("/cart")} className={style.mpFailureBtn}>
        Finish your purchase
      </button>
    </div>
  );
}
