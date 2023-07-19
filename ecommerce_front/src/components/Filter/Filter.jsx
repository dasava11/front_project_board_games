import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import style from "./Filter.module.css";
import { filterDelete } from "../../Redux/actions_creators";
//import { filterGames } from "../../Redux/actions_creators";
//import useLocalSotorage from "../LocalStorage/useLocalStorage";

const getAll = import.meta.env.VITE_GET;

const Filter = (props) => {
  const { type, nameType, SetCurrentPage, filter, setFilter } = props;
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${getAll}/${type}`);
        const data = response.data;
        setFields(data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, []);

  const handleFilters = (event) => {
    const { value } = event.target;
    setFilter({ ...filter, [nameType]: value });
    //dispatch(filterGames({value, nameType}))
    //console.log(value);
    //console.log(nameType);
    dispatch(filterDelete({ ...filter, [nameType]: value }));
    SetCurrentPage(1);
  };

  return (
    <div>
      <Menu>
        <MenuButton
          className={darkMode === true ? style.darkFilterBtn : style.filterBtn}
        >
          {type} <ChevronDownIcon />
        </MenuButton>
        <MenuList className={style.menuList} onClick={handleFilters}>
          {fields &&
            fields.map((field, index) => {
              return (
                <MenuItem
                  className={style.menuItem}
                  key={index}
                  value={field[nameType]}
                >
                  {field[nameType]}
                </MenuItem>
              );
            })}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Filter;
