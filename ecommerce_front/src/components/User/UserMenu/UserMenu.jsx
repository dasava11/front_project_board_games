import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserData from "./UserData/UserData";
import UserWishlist from "./UserWishlist/UserWhishlist";
import UserPurchases from "./UserPurchases/UserPurchases";
import style from "./UserMenu.module.css";
import { getUserById } from "../../../Redux/actions_creators";
import axios from "axios";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Box,
} from "@chakra-ui/react";
import UserWhishlist from "./UserWishlist/UserWhishlist";
const VITE_URL_PAYPAL = import.meta.env.VITE_URL_PAYPAL;

const UserMenu = (props) => {
  const { darkMode, user } = props;

  return (
    <div className={style.userMenuContainer}>
      <Tabs className={style.menuTabs} position="relative">
        <TabList
          className={
            darkMode === true ? style.darkMenuTabList : style.menuTablist
          }
        >
          <Tab>Edit info</Tab>
          <Tab>Purchase History</Tab>
          <Tab>My wishlist</Tab>
        </TabList>
        <hr />
        <TabPanels>
          <TabPanel>
            <UserData user={user} />
          </TabPanel>
          <TabPanel>
            <UserPurchases user={user} />
          </TabPanel>
          <TabPanel>
            <UserWhishlist user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UserMenu;
