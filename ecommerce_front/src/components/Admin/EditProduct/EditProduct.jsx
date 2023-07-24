import React, { useEffect, useState } from "react";
import style from "./editproduct.module.css";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllGamesAdmin } from "../../../Redux/actions_creators";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export const EditProduct = () => {
  const dispatch = useDispatch();
  const [switchState, setSwitchState] = useState(true);
  const games = useSelector((state) => state.allGamesAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGamesAdmin());
  }, []);

  const handleSwitch = (game_id) => {
    axios
      .put(
        `https://backprojectboardgames-production.up.railway.app/games/delete/${game_id}`
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err));
  };

  const showInfo = (e) => {
    const { name, value } = e.target;
    navigate(`/admin/editproductform/${value}`);
  };

  const handleSwitchActivate = (product) => {
    const productAct = {
      ...product,
      active: true,
      author_name: product.Author.author_name,
      editorial_name: product.Editorial.editorial_name,
      categories_name: product.Categories.map((cat) => cat.category_name),
      designers_name: product.Designers.map((des) => des.designer_name),
      mechanics_name: product.Mechanics.map((mec) => mec.mechanic_name),
      thematics_name: product.Thematics.map((t) => t.thematic_name),
      languages_name: product.Languages.map((lan) => lan.language_name),
    };
    axios
      .put(
        "https://backprojectboardgames-production.up.railway.app/games",
        productAct
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => console.error(err));
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
            <th className={style.th}>Activate/Deactivate user</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((g) => {
              return (
                <tr className={style.trb} key={g.game_id}>
                  <td className={style.td}>{g.name}</td>
                  <td className={style.td}>U$D{g.price}</td>
                  <td className={style.td}>{g.stock}</td>
                  <td className={style.td}>
                    <button
                      className={style.thB}
                      key={g.game_id}
                      type="button"
                      value={g.game_id}
                      onClick={(e) => showInfo(e)}
                    >
                      Edit Product
                    </button>
                  </td>
                  <td>
                    {g.active === true ? (
                      <div className={style.td}>
                        <Switch
                          defaultChecked={switchState}
                          onChange={() => {
                            handleSwitch(g.game_id);
                          }}
                        />
                      </div>
                    ) : (
                      <div className={style.td}>
                        <Switch
                          onChange={() => {
                            handleSwitch(g.game_id);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
