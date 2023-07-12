import React from 'react'
import UserMenu from './UserMenu/UserMenu'
import userSvg from '../../Photos/userSvg.svg'
import style from './User.module.css'


const User = () => {
  return (
    <div className={style.userContainer}>
        <div className={style.userImg}>
            <img src={userSvg} alt="user logo" />
            <div>
                <h1>User´s name</h1>
                <h2>email@email.com</h2>
            </div>
        </div>
        <UserMenu/>
    </div>
    
  )
}

export default User