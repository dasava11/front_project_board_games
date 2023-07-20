import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
const VITE_URL_PAYPAL = import.meta.env.VITE_URL_PAYPAL;

const UserMenu = (props) => {
  const dispatch = useDispatch();
  const { darkMode, user } = props;
  const { userAuth } = useAuth();
  const [purchases, setPurchases] = useState([]); // Estado para almacenar las compras del usuario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(VITE_URL_PAYPAL);
        // Filtrar las compras que pertenecen al usuario actual
        const userPurchases = res.data.filter(
          (purchase) => purchase.user_id === userAuth.uid
        );

        setPurchases(userPurchases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userAuth.uid]); // Asegurarse de que la solicitud se realice cuando cambie el uid del usuario

  const handleNameChange = (value) => {
    // Lógica para cambiar el nombre del usuario
  };

  const handleEmailChange = (value) => {
    // Lógica para cambiar el email del usuario
  };

  const handlePasswordChange = (value) => {
    // Lógica para cambiar la contraseña del usuario
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
                          <button>Editar</button>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box maxW="800px" mx="auto" overflowX="auto">
              <Table size="sm" overflowY="auto" maxHeight="400px">
                <Thead>
                    <Th>Purchases</Th>
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
            </Box>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Wish</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user && user.wish_list?.map((w) => <h3 key={w.name}>{w.name}</h3>)}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UserMenu;
