import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Menu,
        MenuButton,
        MenuItem,
        MenuList
} from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'
import style from './Filter.module.css'

const getAll = import.meta.env.VITE_GET;

const Filter = (props) => {

    const {type, nameType} = props
    const [fields, setFields] = useState([])

    useEffect(() =>{
        async function fetchData(){
            try {
                const response = await axios.get(`${getAll}/${type}`)
                const data = response.data
                setFields(data)
            } catch (error) {
                alert(error.message)
            }
        }

        fetchData()
    },[])
  return (
    <div>
        <Menu>
            <MenuButton className={style.filterBtn}>
                {type} <ChevronDownIcon/>
            </MenuButton>
            <MenuList className={style.menuList}>
                {fields && fields.map((field, index) =>{
                    return <MenuItem className={style.menuItem} key={index}>{field[nameType]}</MenuItem>
                })}
            </MenuList>
        </Menu>
    </div>
  )
}

export default Filter