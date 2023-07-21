import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getRoles } from "../../../Redux/actions_creators";
import axios from "axios";
import { toast } from "react-toastify";

import styles from "./userid.module.css";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

export const UserId = () => {
  const userIdInfo = useSelector((state) => state.userDetail);
  const roles = useSelector((state) => state.allRoles);
  const [role, setRole] = useState(userIdInfo.Role?.role_name);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleChangeRole = (e) => {
    const { name, value } = e.target;
    setRole(value);
  };

  const handleSendRole = (e) => {
    e.preventDefault();
    const newRole = {
      user_id: userIdInfo.user_id,
      role_name: role,
    };

    axios
      .put(VITE_URL_USERS, newRole)
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getRoles());
  }, []);
  console.log(userIdInfo);
  return (
    <>
      <h1 className={styles.titleUser}>User's Information</h1>
      <div className={styles.cards}>
        <div className={styles.mainContainerUser}>
          <div className={styles.roleCard}>
            <form onSubmit={(e) => handleSendRole(e)}>
              <label>Current Role</label>
              <select
                onChange={handleChangeRole}
                name="role_name"
                style={{
                  width: "50%",
                  margin: "0.5rem",
                  fontSize: "medium",
                  height: "33px",
                }}
                placeholder="Select a new role"
              >
                <option
                  value="admin"
                  selected={userIdInfo.Role?.role_name === "admin"}
                >
                  Admin
                </option>
                <option
                  value="client"
                  selected={userIdInfo.Role?.role_name === "client"}
                >
                  Client
                </option>
              </select>
              <button type="submit" className={styles.roleButton}>
                Update new role
              </button>
            </form>
          </div>
        </div>

        <div className={styles.mainContainerUser}>
          <h2>{userIdInfo.name}</h2>
          <div className={styles.infoUserContainer}>
            <label className={styles.label}>
              User ID:
              <span
                style={{
                  color: "black",
                  textDecoration: "underline",
                  marginLeft: "3px",
                }}
              >
                {userIdInfo.user_id}
              </span>
            </label>
          </div>
          <div>
            <div>
              <label className={styles.label}>
                Full Name:
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  {userIdInfo.name}
                </span>
              </label>
            </div>
            <div>
              <label className={styles.label}>
                Email:
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  {userIdInfo.email}
                </span>
              </label>
            </div>
          </div>
          <div>
            <div>
              <label className={styles.label}>
                Address:{" "}
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  {userIdInfo.street === null ? (
                    <h4>No address registered</h4>
                  ) : (
                    userIdInfo.street
                  )}
                  {userIdInfo.street_number}
                  {userIdInfo.apartment_number}
                </span>
              </label>

              <label className={styles.label}>
                City:{" "}
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  {userIdInfo.city}
                </span>
              </label>

              <label className={styles.label}>
                ZIP code:
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  {userIdInfo.postal_code}
                </span>
              </label>

              <label className={styles.label}>
                State
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  {userIdInfo.province}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className={styles.label}>
              Phone number:
              <span
                style={{
                  color: "black",
                  textDecoration: "underline",
                  marginLeft: "3px",
                }}
              >
                {userIdInfo.phone_number === null ? (
                  <span>No phone number registered</span>
                ) : (
                  userIdInfo.phone_number
                )}
              </span>
            </label>
          </div>
          <div>
            <br />
            <label className={styles.labelFav}>Whishlist</label>
            <span>
              {userIdInfo.wish_list?.length > 0 ? (
                userIdInfo.wish_list.map((w) => <h4>{w.name}</h4>)
              ) : (
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  Wishing list is empty
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
