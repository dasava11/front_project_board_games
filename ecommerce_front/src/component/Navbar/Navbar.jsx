import React, {useEffect, useState} from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import style from './Navbar.module.css'
import axios from 'axios'

const getAllCategories = import.meta.env.VITE_GET_CATEGORIES

const Navbar = () => {

    const [categories, setCategories] = useState([])

    useEffect(() =>{
        async function fetchData(){
            try {
                const response = await axios.get(getAllCategories)
                const data = response.data
                setCategories(data)
            } catch (error) {
                alert(error.message)
            }
        }

        fetchData()
    },[])

    console.log(categories)

  return (
    <div className={style.navBar}>
        <ul className={style.listFlex}>
            <li>
                <Button>Sale</Button>
            </li>
            <li>
                <Button>FAQ</Button>
            </li>
            <li>
                <Button>Contact Us</Button>
            </li>
            <li>
            <Menu>
                <MenuButton>
                    Games <ChevronDownIcon/>
                </MenuButton>
                <MenuList
                    style={{
                        backgroundColor: 'hsl(240, 34%, 16%)',
                        borderRadius: "4px",
                        padding: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <MenuItem>Button 1</MenuItem>
                    <MenuItem>Button 2</MenuItem>
                    <MenuItem>Button 3</MenuItem>
                </MenuList>
            </Menu>
            </li>
        </ul>
    </div>
    
  )
}

export default Navbar