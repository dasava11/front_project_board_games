import React from "react";
import style from "./UserData.module.css";

const UserData = ({ user }) => {
  return (
    <form className={style.formUserData}>
      <div className={style.userDataLabels}>
        <label>Name:</label>
        <input
          type="text"
          placeholder={user.name === "" ? "Not Available" : user.name}
        />
      </div>
      <div className={style.userDataLabels}>
        <label>City:</label>
        <input
          type="text"
          placeholder={user.city === null ? "Not Available" : user.city}
        />
      </div>
      <div className={style.userDataLabels}>
        <label>Street:</label>
        <input
          type="text"
          placeholder={user.street === null ? "Not Available" : user.street}
        />
      </div>
      <div className={style.userDataLabels}>
        <label>Postal Code:</label>
        <input
          type="number"
          placeholder={
            user.postal_code === null ? "Not Available" : user.postal_code
          }
        />
      </div>
    </form>
  );
};

export default UserData;
