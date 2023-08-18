import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar'

function AuthPage() {
    return (
        <div className='flex flex-col h-[100vh]'>
            <NavBar type={"loggedout"} />
            <div className='AuthPageMain flex-1 flex flex-row items-start justify-between px-5 pt-[8%]'>
                <h1 className='text-8xl font-bold text-white'>One<br />Resume</h1>
                <div className="w-[40%] text-white">
                    <div className="w-[100%] flex flex-row justify-center align-center gap-5">
                        <button className='px-[4%] py-[2%] bg-[#191919] rounded'>
                            <Link to="/login">Login</Link>
                        </button>
                        <button className='px-[4%] py-[2%] bg-[#191919] rounded'>
                            <Link to="/signup">Signup</Link>
                        </button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthPage