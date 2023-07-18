import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../../Redux/actions_creators";
import { Switch } from "antd";
import axios from "axios";
import styles from "./userid.module.css";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

export const UserId = () => {
  const userIdInfo = useSelector((state) => state.userDetail);
  const [user, setUser] = useState({});
  const [checked, setChecked] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleSwitch = async (uid) => {
    // desactivar usuario deleteUser .delete("/:uid", deleteUser)
    await axios.delete(VITE_URL_USERS, uid);
  };
  useEffect(() => {
    dispatch(getUserById(id));
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(userIdInfo);
  return (
    <>
      <h1 className={styles.titleUser}>User's Information</h1>
      <div className={styles.mainContainerUser}>
        <div className={styles.activeBtn}>
          {userIdInfo.active === true ? (
            <>
              <h5>Deactivate User</h5>
              <Switch
                checked
                onChange={() => {
                  handleSwitch(userIdInfo.active);
                }}
              />
            </>
          ) : (
            <>
              <h5>Activate User</h5>
              <Switch
                checked={false}
                onChange={() => {
                  handleSwitch(userIdInfo.active);
                }}
              />
            </>
          )}
        </div>
        <div className={styles.containerUser}>
          <h2>{userIdInfo.name}</h2>
          <div>
            <label>User ID</label>
            <input
              value={userIdInfo.user_id}
              type="text"
              name="user_id"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Full Name:</label>
            <input
              value={userIdInfo.name}
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              value={userIdInfo.email}
              type="text"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <h4>
              {userIdInfo.street === null ? (
                <h4>No address registered</h4>
              ) : (
                userIdInfo.street
              )}
              {userIdInfo.street_number}
              {userIdInfo.apartment_number}
            </h4>
            <label>City:</label>
            <h4>{userIdInfo.city}</h4>
            <label>ZIP code:</label>
            <h4>{userIdInfo.postal_code}</h4>
            <label>State</label>
            <h4>{userIdInfo.province}</h4>
          </div>
          <div>
            <h4>
              <label>Phone number</label>
              {userIdInfo.phone_number === null ? (
                <h5>No phone number registered</h5>
              ) : (
                userIdInfo.phone_number
              )}
            </h4>
          </div>
          <div>
            <label>Whishlist</label>
            {/* <h5>
              {userIdInfo.wish_list.length > 0 ? (
                userIdInfo.wish_list.map((w) => <h4>w.name</h4>)
              ) : (
                <h5> Wishing list is empty</h5>
              )}
            </h5> */}
          </div>
          <label>Current Role</label>
          <input>{userIdInfo.Role.role_name}</input>
        </div>
      </div>
    </>
  );
};
