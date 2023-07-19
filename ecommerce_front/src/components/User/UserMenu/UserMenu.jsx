import React from "react";
import style from "./UserMenu.module.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

const UserMenu = (props) => {
  const { darkMode } = props;

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
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UserMenu;
