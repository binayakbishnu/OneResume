import React from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineGoogle } from 'react-icons/ai'

function LoginCard() {
    const googleLogin = () => {
        console.log('google login');
    }
    const submitLogin = () => {

    }
    return (
        <div className='bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5 pb-6 lg:pb-10'>
            <div className='lg:mb-4 bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 flex flex-row items-center justify-center rounded gap-2'>
                <AiOutlineGoogle className='text-2xl' />
                <input type="button" value="Google login" onClick={googleLogin} />
            </div>

            {/* <h2
                className='w-[100%] text-center border border-0 border-b-[1px] border-dashed border-white leading-[0.1em]'
            >
                <span className='bg-[#191919] px-[4px]'>OR</span>
            </h2> */}

            <form className='flex flex-col gap-5'>
                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Email
                    </label>
                    <input type="email"
                        placeholder='example@domain.com'
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "example@domain.com"}
                        className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Password
                    </label>
                    <input type="password"
                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "example@domain.com"}
                        className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                    />
                </div>

                <div className='flex flex-row gap-2'>
                    <input type="checkbox" />
                    <label htmlFor="">Remember me</label>
                </div>

                <button onClick={submitLogin} type="submit" className='bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 rounded'>Submit</button>
            </form>

            <Link to="/forgotpassword" className='underline'>Forgot Password</Link>

        </div>
    )
}

export default LoginCard