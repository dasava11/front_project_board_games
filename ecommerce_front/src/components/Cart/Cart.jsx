import styles from "./Cart.module.css"
const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  console.log(cart);

  return (
    <div className={styles.cartComponent} >
      {cart &&
        cart.map((game) => {
          return (
            <div className={styles.containerCartOrder} key={cart.indexOf(game)}>
              <img className={styles.imgInCart} src={game.image?.url} alt={game.name} />
              <h1 className={styles.nameGameInOrder} >{game.name}</h1>
              <>
              <button>-</button>
              <input className={styles.countGameInOrder} type="text" placeholder={game.count}/>
              <button>+</button>
              <button className={styles.gameDeleteByOrder} >delete</button>
              </>
              <h1 className={styles.priceOrder} >$ {game.price} USD</h1>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
