import React, { useEffect } from "react";
import style from "./editproduct.module.css";
import { FormOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../../Redux/actions_creators";
import { useNavigate } from "react-router-dom";

export const EditProduct = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  const showInfo = (e) => {
    const { name, value } = e.target;
    navigate(`/admin/editproductform/${value}`);
  };

  return (
    <div className={style.editProductForm}>
      <h1 className={style.titleEdit}>All Products</h1>
      <table className={style.mainTable}>
        <thead className={style.titleTable}>
          <tr className={style.tr}>
            <th className={style.th}>GameName</th>
            <th className={style.th}>Price</th>
            <th className={style.th}>Stock</th>
            <th className={style.th}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((g) => {
              return (
                <tr className={style.tr} key={g.game_id}>
                  <td className={style.th}>{g.name}</td>
                  <td className={style.th}>U$D{g.price}</td>
                  <td className={style.th}>{g.stock}</td>
                  <td className={style.th}>
                    <button
                      key={g.game_id}
                      type="button"
                      value={g.game_id}
                      onClick={(e) => showInfo(e)}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
