import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "antd";
import { getAllUsers } from "../../../Redux/actions_creators";
import style from "./userAdmin.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const UsersAdmin = () => {
  const users = useSelector((state) => state.allUsers);
  const [switchState, setSwitchState] = useState(true);
  const [search, setSearch] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [users]);

  const handleSwitch = async (user_id) => {
    await axios
      .delete(
        `https://backprojectboardgames-production.up.railway.app/users/${user_id}`
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err.message));
  };

  const handleSwitchActivate = async (user_id) => {
    const info = { user_id, active: true };
    await axios
      .put(
        "https://backprojectboardgames-production.up.railway.app/users/",
        info
      )
      .then((res) =>
        res.status === 200 ? toast.success(res.data.message) : null
      )
      .catch((err) => toast.error(err));
  };
  const editUser = (e) => {
    const { name, value } = e.target;
    navigate(`/admin/userid/${value}`);
  };

  return (
    <div className={style.mainContainerUser}>
      <h2>All Users</h2>
      <table className={style.tableUser}>
        <thead className={style.titleUser}>
          <tr className={style.tr}>
            <th className={style.th}>Name</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>Role</th>
            <th className={style.th}>Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => {
              return (
                <tr className={style.tr} key={u.user_id}>
                  <td className={style.td}>{u.name}</td>
                  <td className={style.td}>{u.email}</td>
                  <td className={style.td}>
                    {u.Role.role_name}{" "}
                    <button
                      className={style.thbd}
                      key={u.user_id}
                      type="button"
                      value={u.user_id}
                      onClick={(e) => editUser(e)}
                    >
                      Edit
                    </button>
                  </td>

                  <td className={style.td}>
                    {u.active === true ? (
                      <>
                        <Switch
                          checked={switchState}
                          style={{ margin: "6px" }}
                          onChange={() => {
                            handleSwitch(u.user_id);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Switch
                          style={{ margin: "6px" }}
                          onChange={() => {
                            handleSwitchActivate(u.user_id);
                          }}
                        />
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default UsersAdmin;
