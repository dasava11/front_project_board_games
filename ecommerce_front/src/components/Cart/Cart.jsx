import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("cart")));
  let suma = 0;
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode);

  const handleTabClose = (e) => {
    e.preventDefault();
    localStorage.setItem("cart", JSON.stringify(order));
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      localStorage.setItem("cart", JSON.stringify(order));
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [order]);

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
  };

  const handleCheckout = () => {
    const gameDescriptions = order.map((game) => ({
      name: game.name,
      price: game.price,
      quantity: game.count,
    }));
    navigate("/checkout", {
      state: { amount: suma.toString(), buys: gameDescriptions },
    });
  };

  console.log(order);

  return (
    <div className={styles.cartComponentComplete}>
      <div className={styles.cartComponent}>
        <div>
          {order && order.length > 0 ? (
            order.map((game) => {
              return (
                <div
                  className={styles.containerCartOrder}
                  key={order.indexOf(game)}
                >
                  <div className={styles.imgInCart}>
                    <img src={game.image[0]} alt={game.name} />
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
            })
          ) : (
            <div
              className={
                darkMode === true ? styles.darkEmptyCart : styles.emptyCart
              }
            >
              <h1>Your cart is empty</h1>
              <hr />
              <h2>Check our catalog to add something to your cart</h2>
            </div>
          )}
        </div>
        {order && order.length > 0 ? (
          <div className={styles.checkoutContainer}>
            <div className={styles.totalContainer}>
              <h1 className={styles.total}>
                subtotal ({order.length} producto):
              </h1>
              {order &&
                order.map((game) => {
                  suma = suma + Number(game.price * game.count);
                })}
              <h1 className={styles.totalPriceOrder}>${suma.toFixed(2)} USD</h1>
            </div>
            <button
              className={styles.gameDeleteByOrder}
              onClick={() => handleCheckout()}
            >
              check out
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
