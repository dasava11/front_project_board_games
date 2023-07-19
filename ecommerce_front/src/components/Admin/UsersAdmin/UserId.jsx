import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../../Redux/actions_creators";
import { Switch } from "antd";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";

import styles from "./userid.module.css";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;
const { Option } = Select;
export const UserId = () => {
  const userIdInfo = useSelector((state) => state.userDetail);
  const [user, setUser] = useState({});
  const [role, setRole] = useState();
  const [checked, setChecked] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleChangeRole = (value) => {
    setRole({ ...role, Role: { role_name: value } });
  };
  const handleSwitch = async (user_id) => {
    await axios
      .delete(VITE_URL_USERS, user_id)
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => console.error(err));
  };
  const handleDeleteRole = () => {
    userIdInfo.Role.role_name = "";
    setRole({ ...role, Role: { role_name: "" } });
  };
  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  return (
    <>
      <h1 className={styles.titleUser}>User's Information</h1>
      <div className={styles.mainContainerUser}>
        <div className={styles.activeBtn}>
          {userIdInfo.active === true ? (
            <>
              <span>Deactivate User</span>
              <Switch
                checked
                onChange={() => {
                  handleSwitch(userIdInfo.active);
                }}
              />
            </>
          ) : (
            <>
              <span>Activate User</span>
              <Switch
                checked={false}
                onChange={() => {
                  handleSwitch(userIdInfo.active);
                }}
              />
            </>
          )}
        </div>
        <br />
        <div>
          <label>
            Current Role:
            <button onClick={handleDeleteRole} type="button" name="role">
              {userIdInfo.Role?.role_name} X{" "}
            </button>
          </label>
          <label>Change Role</label>
          <Select
            key={"role_name"}
            onChange={handleChangeRole}
            name="role_name"
            style={{
              width: "50%",
              margin: "0.5rem",
              fontSize: "medium",
              height: "33px",
            }}
            placeholder="Select categories"
          >
            <Option value="admin">Admin</Option>
            <Option value="cliente">Client</Option>
          </Select>
        </div>
        <div className={styles.containerUser}>
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
            <label className={styles.label}>Whishlist</label>
            <span>
              {userIdInfo.wish_list?.length > 0 ? (
                userIdInfo.wish_list.map((w) => <h4>w.name</h4>)
              ) : (
                <span> Wishing list is empty</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
