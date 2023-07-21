import React, { useState } from "react";
import style from "./editform.module.css";
import { Switch } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
export const ModifyOnSale = (props) => {
  const { product, setProduct, handleSwitch, handleSwitchOnSale } = props;
  const [switchState, setSwitchState] = useState(true);
  const handleSwitchActivate = async (product) => {
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
    console.log(productAct);
    await axios
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
    <div>
      <div className={style.buttonEdition}>
        {product.active === true ? (
          <div className={style.switchButton}>
            <h6>Deactivate product</h6>
            <Switch
              checked={switchState}
              onChange={() => {
                handleSwitch(product.game_id);
              }}
            />
          </div>
        ) : (
          <div className={style.switchButton}>
            <h6>Activate product</h6>
            <Switch
              onChange={() => {
                handleSwitchActivate(product);
              }}
            />
          </div>
        )}
        <br />
        {product.on_sale === true ? (
          <div className={style.switchButton}>
            <h6>Deactivate OnSale</h6>
            <Switch
              checked
              onChange={() => {
                handleSwitchOnSale(product.game_id);
              }}
            />
          </div>
        ) : (
          <div className={style.switchButton}>
            <h6>Activate OnSale</h6>
            <Switch
              checked={false}
              onChange={() => {
                handleSwitchOnSale(product.game_id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
