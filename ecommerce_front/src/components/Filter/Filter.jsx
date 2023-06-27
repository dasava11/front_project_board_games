import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import style from "./Filter.module.css";
//import useLocalSotorage from "../LocalStorage/useLocalStorage";

const getAll = import.meta.env.VITE_GET;

const Filter = (props) => {
  const { type, nameType, currentGames, setCurrentGames, SetCurrentPage } =
    props;
  const [fields, setFields] = useState([]);

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
    console.log(value);
    value
      ? setCurrentGames(
          currentGames.filter(
            (game) => game[nameType] && game[nameType].includes(value)
          )
        )
      : currentGames;
    SetCurrentPage(1);
  };

  return (
    <div>
      <Menu>
        <MenuButton className={style.filterBtn}>
          {type} <ChevronDownIcon />
        </MenuButton>
        <MenuList
          value="all"
          className={style.menuList}
          onClick={handleFilters}
        >
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
