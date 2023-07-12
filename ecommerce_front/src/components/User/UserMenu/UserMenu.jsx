import React from 'react'
import style from './UserMenu.module.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

const UserMenu = () => {
  return (
    <div className={style.userMenuContainer}>
        <Tabs className={style.menuTabs} position="relative">
            <TabList className={style.menuTablist}>
            <Tab>Favorites</Tab>
            <Tab>Purchase History</Tab>
            <Tab>My lists</Tab>
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
  )
}

export default UserMenu