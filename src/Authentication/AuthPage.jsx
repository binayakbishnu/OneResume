import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar'

function AuthPage() {
    return (
        <div className='flex flex-col h-[100vh]'>
            <NavBar type={"loggedout"} />
            <div className='AuthPageMain flex-1 flex flex-col lg:flex-row items-start lg:justify-between gap-6 lg:gap-0 px-5 lg:mt-[2%]'>
                <h1 className='text-6xl lg:text-8xl font-bold text-white'>One<br />Resume</h1>
                <div className="lg:mr-[5%] w-[100%] lg:w-[30%] h-auto lg:h-auto text-white flex flex-col items-stretch justify-between">
                    <div className="w-[100%] flex flex-row justify-center items-center gap-5">
                        <Link to="/login" className='px-[4%] py-[2%] bg-[#191919] rounded'>
                            <button>
                                Login
                            </button>
                        </Link>
                        <Link to="/signup" className='px-[4%] py-[2%] bg-[#191919] rounded'>
                            <button>
                                Signup
                            </button>
                        </Link>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthPage