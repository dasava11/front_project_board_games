import { useEffect } from "react";
import useLocalStorage from "../LocalStorage/useLocalStorage";
import styles from "./Cart.module.css";
const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [order, setOrder] = useLocalStorage("order", []);

  /*   useEffect(() => {
    setOrder(cart);
  }, [order]); */
  //console.log(order);

  ///// VVV REVISAR LA IDEA VVV /////////

  /*   const handleDelete = (event) => {
    const { value } = event.target;
    order.map((game) => {
      let update;
      if (game.count === 1) {
        update = cart.filter((game) => game.game_id !== value);
        setOrder([...update]);
      }
      if (game.count > 1) {
        update = cart.map((game) => {
          if (game.game_id === value) {
            game.count = game.count - 1;
          }
        });
        setOrder([...update]);
      }
    });
    console.log(order);
  }; */

  return (
    <div className={styles.cartComponent}>
      {cart &&
        cart.map((game) => {
          return (
            <div className={styles.containerCartOrder} key={cart.indexOf(game)}>
              <img
                className={styles.imgInCart}
                src={game.image?.url}
                alt={game.name}
              />
              <h1 className={styles.nameGameInOrder}>{game.name}</h1>
              <>
                <button>-</button>
                <input
                  className={styles.countGameInOrder}
                  type="text"
                  placeholder={game.count}
                />
                <button>+</button>
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
        {cart &&
          cart.map((game) => {
            let suma = 0;
            if (typeof game.total_price !== "number") {
              game.total_price = parseInt(game.total_price);
            }
            suma += game.total_price;
            console.log(suma);
            <h1>{suma}</h1>;
          })}
      </div>
    </div>
  );
};

export default Cart;
