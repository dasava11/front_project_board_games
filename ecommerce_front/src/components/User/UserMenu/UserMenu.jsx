import React, { useEffect, useState } from "react";
import style from "./UserMenu.module.css";
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
import axios from "axios";

const VITE_URL_PAYPAL = import.meta.env.VITE_URL_PAYPAL;

const UserMenu = (props) => {
  const { darkMode } = props;
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
                      <Th>Email</Th>
                      <Th>Password</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr key={userAuth.email}>
                      <Td>
                        <Input
                          size="sm"
                          w="120px"
                          value={userAuth.displayName}
                          onChange={(e) => handleNameChange(e.target.value)}
                        />
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          w="180px"
                          value={userAuth.email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                        />
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          w="100px"
                          value="******"
                          onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                      </Td>
                      <button>Editar</button>
                    </Tr>
                  </Tbody>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UserMenu;
