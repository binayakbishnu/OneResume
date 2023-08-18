import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar'

function AuthPage() {
    return (
        <div>
            <NavBar type={"loggedout"} />
            AuthPage
            <div className="">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default AuthPage