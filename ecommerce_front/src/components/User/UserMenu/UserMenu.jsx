import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import { useAuth } from "../../Auth/authContext";
import { auth } from "../../Auth/firebase";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

const UserMenu = (props) => {
  const dispatch = useDispatch();
  const { darkMode, user } = props;
  const { userAuth } = useAuth();
  const [fav, setFav] = useState();

  const handleNameChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, name: value }));
  };

  const handleEmailChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, email: value }));
  };

  const handlePasswordChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, password: value }));
  };

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
            <Box maxW="800px" mx="auto">
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Adress</Th>
                      <Th>Password</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr key={user.email}>
                      <Td>
                        <Input
                          size="sm"
                          w="120px"
                          value={user.name}
                          onChange={(e) => handleNameChange(e.target.value)}
                        />
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          w="180px"
                          value={user.street}
                          onChange={(e) => handleEmailChange(e.target.value)}
                        />
                      </Td>
                      <Td>
                        <NavLink>Change password</NavLink>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Purchases</Th>
                </Tr>
              </Thead>
              <Tbody></Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Wish</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user && user.wish_list?.map((w) => <h3>{w.name}</h3>)}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
        <button>Editar</button>
      </Tabs>
    </div>
  );
};

export default UserMenu;
