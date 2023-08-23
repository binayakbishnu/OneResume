import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar'

function AuthPage() {
    const [active, setActive] = useState("login");
    const toggle = (input) => {
        input === "login" ? setActive("login") : setActive("signup");
    }
    return (
        <div className='flex flex-col h-[100vh]'>
            <NavBar type={"loggedout"} email={""} />
            <div className='AuthPageMain flex-1 flex flex-col lg:flex-row items-start lg:justify-between gap-6 lg:gap-0 px-[5%] lg:mt-[2%]'>
                <h1 className='text-6xl lg:text-9xl font-bold text-white lg:mt-8'>One<br />Resume</h1>
                <div className="w-[100%] lg:w-[30%] h-auto lg:h-auto text-white flex flex-col items-stretch justify-between">
                    <div className="w-[100%] flex flex-row justify-center items-center gap-5">
                        <Link to="/login" className={`px-[4%] py-[2%] bg-[${active === "login" ? "#202020" : "#191919"}] border ${active === "login" ? "border-[rgba(255,255,255,0.2)]" : "border-none"} hover:bg-[#202020] rounded`}
                            onClick={() => toggle('login')}>
                            <button>
                                Login
                            </button>
                        </Link>
                        <Link to="/signup" className={`px-[4%] py-[2%] bg-[${active === "login" ? "#191919" : "#202020"}] border ${active === "signup" ? "border-[rgba(255,255,255,0.2)]" : "border-none"} hover:bg-[#202020] rounded`}
                            onClick={() => toggle("signup")}>
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