const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  console.log(cart);

  return (
    <div>
      {cart &&
        cart.map((game) => {
          return (
            <div key={cart.indexOf(game)}>
              <img src={game.image?.url} alt={game.name} />;
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
