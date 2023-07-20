import React, { useState } from "react";
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

const UserMenu = (props) => {
  const { darkMode } = props;

  const initialData = {
    id: 1,
    name: "Kaleth",
    email: "Kaleth@example.com",
    password: "********",
  };

  const [user, setUser] = useState(initialData);

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
                    <Tr key={user.id}>
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
                          value={user.email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                        />
                      </Td>
                      <Td>
                        <Input
                          size="sm"
                          w="100px"
                          value={user.password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                        />
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
                  </Tbody>
                </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UserMenu;
