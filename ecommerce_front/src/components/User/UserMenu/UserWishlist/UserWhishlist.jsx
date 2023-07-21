import React from "react";
import style from "./UserWishlist.module.css";
import { Link } from "react-router-dom";

const UserWhishlist = ({ user }) => {
  return (
    <div className={style.wishlistContainer}>
      {user &&
        user.wish_list?.map((w) => {
          return (
            <Link
              key={w.game_id}
              to={`/details/${w.game_id}`}
              className={style.wishlistItem}
            >
              <img src={w.image[0]} alt={w.name} />
              <h3 key={w.game_id}>{w.name}</h3>
            </Link>
          );
        })}
    </div>
  );
};

export default UserWhishlist;
