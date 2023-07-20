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
const VITE_URL_PAYPAL = import.meta.env.VITE_URL_PAYPAL;

const UserMenu = (props) => {
  const dispatch = useDispatch();
  const { darkMode, user } = props;
  const { userAuth } = useAuth();
  const [fav, setFav] = useState();
  const [purchases, setPurchases] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(VITE_URL_PAYPAL);
        const userPurchases = res.data.filter(
          (purchase) => purchase.user_id === userAuth.uid
        );

        setPurchases(userPurchases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userAuth.uid]);

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
                        <h2>{user.name}</h2>
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          w="80px"
                          value={user.street}
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
              <Tbody>
                {purchases.map((purchase, index) => (
                    <Tr key={index}>
                      <Td>
                        <ul className={style.purchases}>
                          {purchase.description.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <h4>Name: {item.name}</h4>
                              <h5>Price: {item.price}</h5>
                              <h5>Quantity: {item.quantity}</h5>
                            </li>
                          ))}
                        </ul>
                      </Td>
                      <Td>
                        <h4>Total amount: {purchase.total_amount}$</h4>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
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
      </Tabs>
    </div>
  );
};

export default UserMenu;