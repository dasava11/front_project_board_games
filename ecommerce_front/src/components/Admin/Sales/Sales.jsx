import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import style from "./sales.module.css";
import { getAllPurchases } from "../../../Redux/actions_creators";
import { Switch } from "antd";
import { toast } from "react-toastify";


const serviceId = import.meta.env.VITE_SERVICE_ID;
const publicId = import.meta.env.VITE_YOUR_PUBLIC_KEY;
const templateIdShipped = "template_hltdivo";
const templateIdDelivered = "template_bvcs98q";


export const Sales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.allPurchases);
  const [filterSales,setFilterSales] = useState(sales);
  const [search, setSearch] = useState();
  let salesFiltered = [];

  useEffect(() => {
    dispatch(getAllPurchases());
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    if(value === '') setFilterSales(sales);

    if(isNaN(value)){
      salesFiltered = sales.filter(sale => sale.name.toLowerCase().includes(value.toLowerCase()));
      if(salesFiltered.length > 0){
        setFilterSales([...salesFiltered])
      }
    } else{
      salesFiltered = sales.find(sale => sale.purchase_id == value)
      if(salesFiltered !== undefined){
        setFilterSales([salesFiltered])
      }
    }
  };


  const handleSwitch = async(checked, sale) => {

    if(sale.state === 'Preparing'){
      // await axios.put('https://backprojectboardgames-production.up.railway.app/purchase/state',{purchase_id:sale.purchase_id, state:"Shipped"})
      await axios.put('https://backprojectboardgames-production.up.railway.app/purchase/state',{purchase_id:sale.purchase_id, state:"Shipped"})

      const templateParamsShipped = {
        user_name: sale.name,
        message: "Your order has been dispatched.",
        user_email: sale.email,
      };
      emailjs.send(serviceId, templateIdShipped, templateParamsShipped, publicId).then(
        function (response) {},
        function (error) {
          console.log("FAILED...", error);
        }
      );
      toast.success("The email has been sent!");

      dispatch(getAllPurchases());
    }
    if(sale.state === 'Shipped'){
      // await axios.put('https://backprojectboardgames-production.up.railway.app/purchase/state',{purchase_id:sale.purchase_id, state:"Delivered"})
      await axios.put('https://backprojectboardgames-production.up.railway.app/purchase/state',{purchase_id:sale.purchase_id, state:"Delivered"})


      const templateParamsDelivered= {
        user_name: sale.name,
        message: "Your order has been delivered.",
        user_email: sale.email,
      };
      emailjs.send(serviceId, templateIdDelivered, templateParamsDelivered, publicId).then(
        function (response) {},
        function (error) {
          console.log("FAILED...", error);
        }
      );
      toast.success("The email has been sent!");

      dispatch(getAllPurchases());
    console.log('Delivered')

    }
  };

  useEffect(() => {
    setFilterSales(sales);
  }, [sales]);

  return (
    <div className={style.mainFormPurchase}>
      <h1>All Sales</h1>
      <div className={style.searchContainer}>
        <form>
          <input
            className={style.inputSearch}
            type="text"
            name="search"
            placeholder="Search by ID or Name"
            onChange={handleChange}
          />
        </form>
      </div>
      <table className={style.purchaseTable}>
        <thead className={style.purchaseHead}>
          <tr className={style.purchTr}>
            <th className={style.tH}> Nº Purchase</th>
            <th className={style.tH}>Name</th>
            <th className={style.tH}>Products</th>
            <th className={style.tH}>Amount</th>
            <th className={style.tH}>State</th>
            <th className={style.tH}>Dispatched</th>
            <th className={style.tH}>Delivered</th>
          </tr>
        </thead>
        <tbody className={style.purchaseBody}>
        {filterSales.length>0 &&
            filterSales.reverse().map((sale) => {
              return (
                <tr className={style.purchTr} key={sale.purchase_id}>
                  <td className={style.tH}>{sale.purchase_id}</td>
                  <td className={style.tH}>{sale.name}</td>
                  <td className={style.tH}>
                    {sale.description.map((e,key) => (
                      <div className={style.divTable} key={key}>
                        {e.name} x Units {e.quantity}
                      </div>
                    ))}
                  </td>
                  <td className={style.tH}>{sale.total_amount}</td>
                  <td className={style.tH}>{sale.state}</td>
                  <th className={style.tH}>
                    <div key={sale.id}>
                      <Switch checked={sale.state !== 'Preparing'} disabled={sale.state !== 'Preparing'} onChange={(checked) => handleSwitch(checked,sale)} />
                    </div>
                  </th>
                  <th className={style.tH}>
                    <div key={sale.id}>
                      <Switch checked={sale.state === 'Delivered'} disabled={sale.state !== 'Shipped'} onChange={(checked) => handleSwitch(checked,sale)} />
                    </div>
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
