import React from "react";
import { useDispatch } from "react-redux";
import { sortGames } from "../../Redux/actions_creators";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import style from "./SortGames.module.css";

const SortGames = ({ SetCurrentPage }) => {
  const dispatch = useDispatch();

  const handleSortGames = (event) => {
    const { value } = event.target;
    console.log(value);
    dispatch(sortGames(value));
    SetCurrentPage(1);
  };

  return (
    <div>
      <Menu>
        <MenuButton className={style.filterBtn}>
          Sort
          <ChevronDownIcon />
        </MenuButton>
        <MenuList
          className={style.menuList}
          value="order"
          onClick={handleSortGames}
        >
          <MenuItem className={style.menuItem} value="highest price">
            Highest price
          </MenuItem>
          <MenuItem className={style.menuItem} value="lowest price">
            Lowest price
          </MenuItem>
          <MenuItem className={style.menuItem} value="A-Z">
            A - Z
          </MenuItem>
          <MenuItem className={style.menuItem} value="Z-A">
            Z - A
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default SortGames;
