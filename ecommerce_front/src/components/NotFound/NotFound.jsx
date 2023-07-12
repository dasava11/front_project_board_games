import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.css";
import bsop from "../../Photos/BSOD.jpg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={style.notFoundContainer}>
      <img src={bsop} alt="404 page not found" className={style.notFoundImg} />
      <button onClick={() => navigate("/games")} className={style.notFoundBtn}>
        Go back
      </button>
    </div>
  );
}
