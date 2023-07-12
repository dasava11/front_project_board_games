import { useNavigate } from "react-router-dom";
import style from "./MercadoPagoPending.module.css";

export default function MercadoPagoPending() {
  const navigate = useNavigate();

  return (
    <div className={style.mpPendingContainer}>
      <h1>Almost there...</h1>
      <button onClick={() => navigate("/cart")} className={style.mpPendingBtn}>
        Finish your purchase
      </button>
    </div>
  );
}
