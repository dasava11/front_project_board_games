import { useEffect, useState } from "react";
//import useLocalStorage from "../LocalStorage/useLocalStorage";
import styles from "./Cart.module.css";

const Cart = () => {
  //let cart = JSON.parse(localStorage.getItem("cart"));
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("cart")));


  
  //useLocalStorage("order", []);

  // useEffect(() => {
  //   setOrder(cart);
  // }, [order]);
  

  ///// VVV REVISAR LA IDEA VVV /////////

    const handleAmount = (event) => {
    
    const { value } = event.target;
    order.map((game) => {
      if (value === `${game.game_id}_increase`) {
        game.count ++;
        setOrder ([...order]);
        console.log(order);
      }
      if (value === `${game.game_id}_decrease`) {
        game.count --;
        setOrder ([...order]);
        console.log(order);
      }
    });
  };

  const handleDelete = (event) => {
    const {value} = event.target;
    console.log(typeof value);
    let update = order.filter((game) => game.game_id !== parseInt(value));
    console.log(update);
    setOrder([...update]);
}


  return (
    <div className={styles.cartComponent}>
      {order &&
        order.map((game) => {
          return (
            <div className={styles.containerCartOrder} key={order.indexOf(game)}>
              <img
                className={styles.imgInCart}
                src={game.image?.url}
                alt={game.name}
              />
              <h1 className={styles.nameGameInOrder}>{game.name}</h1>
              <>
                <button value = {`${game.game_id}_decrease`} disabled = {game.count === 1 ? true : false} onClick = {handleAmount}>-</button>
                <input
                  className={styles.countGameInOrder}
                  type="text"
                  placeholder={game.count}
                />
                <button value = {`${game.game_id}_increase`} onClick = {handleAmount}>+</button>
                <button
                  value={game.game_id}
                  className={styles.gameDeleteByOrder}
                  onClick={handleDelete}
                >
                  delete
                </button>
              </>
              <h1 className={styles.priceOrder}>$ {game.price} USD</h1>
            </div>
          );
        })}
      <div>
        <h1>TOTAL</h1>
        {order &&
          order.map((game) => {
            let suma = 0;
            if (typeof game.total_price !== "number") {
              game.total_price = parseInt(game.total_price);
            }
            suma += game.total_price;
            <h1>{suma}</h1>;
          })}
      </div>
    </div>
  );
};

export default Cart;
