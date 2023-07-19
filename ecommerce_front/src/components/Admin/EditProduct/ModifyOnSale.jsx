import React from "react";
import style from "./editform.module.css";
import { Switch } from "antd";
export const ModifyOnSale = (props) => {
  const { product, setProduct, handleSwitch, handleSwitchOnSale } = props;
  console.log(props);
  return (
    <div>
      <div className={style.buttonEdition}>
        {product.active === true ? (
          <div className={style.switchButton}>
            <h6>Deactivate product</h6>
            <Switch
              checked
              onChange={() => {
                handleSwitch(product.game_id);
              }}
            />
          </div>
        ) : (
          <div className={style.switchButton}>
            <h6>Activate product</h6>
            <Switch
              checked={false}
              onChange={() => {
                handleSwitch(product.game_id);
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
