import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getRoles } from "../../../Redux/actions_creators";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";

import styles from "./userid.module.css";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

const { Option } = Select;
export const UserId = () => {
  const userIdInfo = useSelector((state) => state.userDetail);
  const roles = useSelector((state) => state.allRoles);
  const [role, setRole] = useState();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  //  if (e.target.name === "author_name") {
  //       product.Author.author_name = "";
  //       setProduct({ ...product, Author: { author_name: "" } });
  const handleDeleteRole = async () => {
    userIdInfo.Role.role_name = "";
    setRole({ ...role, Role: { role_name: "" } });
  };
  const handleChangeRole = (e) => {
    const { name, value } = e.target;
    console.log("aca value", value); //hasta aca llega
    setRole({ Role: { role_name: value } });
    console.log(role);
  };
  console.log(userIdInfo);
  const handleSendRole = async (e) => {
    e.preventDefault();
    const newRole = {
      user_id: userIdInfo.user_id,
      role_name: role.role_name,
    };
    console.log(newRole);
    await axios
      .put(
        `https://backprojectboardgames-production.up.railway.app/users/`,
        newRole
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getRoles());
  }, []);

  return (
    <>
      <h1 className={styles.titleUser}>User's Information</h1>
      <div className={styles.cards}>
        <div className={styles.mainContainerUser}>
          <div className={styles.roleCard}>
            <label>Current Role:</label>
            {userIdInfo.Role?.role_name ? (
              <button
                onClick={handleDeleteRole}
                type="button"
                name="role_name"
                className={styles.roleButton}
              >
                {userIdInfo.Role?.role_name}
                <DeleteIcon style={{ marginLeft: "2rem" }} />
              </button>
            ) : (
              <button type="button" name="role" className={styles.roleButton}>
                No current role
              </button>
            )}

            <form onSubmit={(e) => handleSendRole(e)}>
              <label>Select new Role</label>
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
                {roles &&
                  roles?.map((r) => {
                    return (
                      <>
                        <option key={r.role_id} value={r.role_name}>
                          {r.role_name}
                        </option>
                      </>
                    );
                  })}
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
            <label className={styles.label}>Whishlist</label>
            <span>
              {userIdInfo.wish_list?.length > 0 ? (
                userIdInfo.wish_list.map((w) => <h4>w.name</h4>)
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
