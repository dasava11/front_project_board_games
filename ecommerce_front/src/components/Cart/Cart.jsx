import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Cart.module.css";

const Cart = () => {
  
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("cart")));
  
  let suma = 0;
  const navigate = useNavigate();
  
  const handleTabClose = (e) => {
    e.preventDefault();
    localStorage.setItem("cart", JSON.stringify(order));
  }
  
 useEffect(() => {

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      localStorage.setItem("cart", JSON.stringify(order));
      window.removeEventListener('beforeunload', handleTabClose);
    }
  }, [localStorage.setItem("cart", JSON.stringify(order)),
      JSON.parse(localStorage.getItem("cart")) ]);
  
  
  
  const handleAmount = (event) => {
    const { value } = event.target;
    order.map((game) => {
      if (value === `${game.game_id}_increase`) {
        game.count++;
        setOrder([...order]);
      }
      if (value === `${game.game_id}_decrease`) {
        game.count--;
        setOrder([...order]);
      }
    });
  };

  const handleDelete = (event) => {
    const { value } = event.target;
    let update = order.filter((game) => game.game_id !== parseInt(value));
    setOrder([...update]);
    console.log(order)
  };

  return (
    <div className={styles.cartComponent}>
      {order &&
        order.map((game) => {
          return (
            <div
              className={styles.containerCartOrder}
              key={order.indexOf(game)}
            >
              <div className={styles.imgInCart}>
                <img src={game.image?.url} alt={game.name} />
              </div>
              <div>
                <h1 className={styles.nameGameInOrder}>{game.name}</h1>
              </div>
              <div>
                <button
                  className={styles.gameAmountBtn}
                  value={`${game.game_id}_decrease`}
                  disabled={game.count === 1 ? true : false}
                  onClick={handleAmount}
                >
                  -
                </button>
                <input
                  disabled
                  className={styles.countGameInOrder}
                  type="text"
                  placeholder={game.count}
                />
                <button
                  className={styles.gameAmountBtn}
                  value={`${game.game_id}_increase`}
                  disabled={game.count >= game.stock ? true : false}
                  onClick={handleAmount}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  value={game.game_id}
                  className={styles.gameDeleteByOrder}
                  onClick={handleDelete}
                >
                  delete
                </button>
              </div>
              <div>
                <h1 className={styles.priceOrder}>
                  $ {(game.price * game.count).toFixed(2)} USD
                </h1>
              </div>
            </div>
          );
        })}
      <div className={styles.checkoutContainer}>
        <div className={styles.totalContainer}>
          <h1 className={styles.total}>TOTAL</h1>
          {order &&
            order.map((game) => {
              suma = suma + Number(game.price * game.count);
            })}
          <h1 className={styles.totalPriceOrder}>$ {suma.toFixed(2)} USD</h1>
        </div>
        <button
          disabled={order.length < 1 ? true : false}
          className={styles.gameDeleteByOrder}
          onClick={() => navigate("/paypal")}
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
