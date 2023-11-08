import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import miniLogo from "/jobly-logo-mini.svg"
import JoblyApi from './helpers/api';

function NavBar({ user }) {
    // const [username, setUsername] = useState(null)

    // async function getUsername() {
    //     const res = await JoblyApi.getUser(user)
    //     console.log(res)
    // }

    // useEffect(() => {
    //     getUsername()
    // }, [user])

    return (
        <>
            <header>
                <NavLink to='/' ><img className='logo-mini' src={miniLogo} /></NavLink>

                {user ?
                    <div className='flex-row'>
                        <NavLink className='nav' to='/profile'><span className='material-icons'>person</span>{user.username}</NavLink>
                        <NavLink className='nav' to='/logout'>Logout</NavLink>
                    </div>
                    :
                    <div className='flex-row'>
                        <NavLink className='nav' to='/login'>Login</NavLink>
                        <NavLink className='nav' to='/signup'>Signup</NavLink>
                    </div>
                }


            </header>

        </>
    )
}

export default NavBar
