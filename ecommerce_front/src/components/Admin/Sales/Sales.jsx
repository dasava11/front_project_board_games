import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./sales.module.css";
import { getAllPurchases } from "../../../Redux/actions_creators";
import { Switch } from "antd";
export const Sales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.allPurchases);
  const [search, setSearch] = useState();
  const [switchState, setSwitchState] = useState(false);

  useEffect(() => {
    dispatch(getAllPurchases());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };
  const handleSwitch = () => {};

  return (
    <div className={style.mainFormPurchase}>
      <h1>All Sales</h1>
      <div className={style.searchContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={style.inputSearch}
            type="text"
            name="search"
            placeholder="Search by ID"
            onChange={handleChange}
          />
          <button type="submit" className={style.goButton}>
            Go!
          </button>
        </form>
      </div>
      <table className={style.purchaseTable}>
        <thead className={style.purchaseHead}>
          <tr className={style.purchTr}>
            <th className={style.tH}> Nº Purchase</th>
            {/* <th className={style.tH}>Username</th> */}
            <th className={style.tH}>Products purchased</th>
            <th className={style.tH}>Amount</th>
            <th className={style.tH}>Dispatched order</th>
          </tr>
        </thead>
        <tbody className={style.purchaseBody}>
          {sales &&
            sales.map((sale) => {
              return (
                <tr className={style.purchTr} key={sale.purchase_id}>
                  <td className={style.tH}>{sale.purchase_id}</td>
                  {/* <td className={style.tH}>{sale.username}</td> */}
                  <td className={style.tH}>
                    {sale.description.map((e) => (
                      <div className={style.divTable} key={e.id}>
                        {e.name} x Units {e.quantity}
                      </div>
                    ))}
                  </td>
                  <td className={style.tH}>{sale.total_amount}</td>
                  <th className={style.tH}>
                    <Switch
                      checked={switchState}
                      onChange={() => {
                        handleSwitch();
                      }}
                    />
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
