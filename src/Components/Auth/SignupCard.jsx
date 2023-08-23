import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AiOutlineGoogle } from 'react-icons/ai'

import { auth, registerWithEmailAndPassword, signInWithGoogle, } from "../../Authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function SignupCard() {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const googleSignup = () => {
        console.log('google signup');
        signInWithGoogle();
    }
    const submitSignup = () => {
        console.log('submit signup');
        registerWithEmailAndPassword(/* name,  */email, password);
    }

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
    }, [user, loading]); useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    return (
        <div className='bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5 pb-6 lg:pb-10'>
            <button onClick={googleSignup} className='lg:mb-4 bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 flex flex-row items-center justify-center rounded gap-2'>
                <AiOutlineGoogle className='text-2xl' />
                Google login
            </button>

            <form className='flex flex-col gap-5'>
                {/* <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Name
                        </label>
                    <input type="text"
                        placeholder='Full name'
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "Full name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                    />
                </div> */}
                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Email
                    </label>
                    <input type="email"
                        placeholder='example@domain.com'
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "example@domain.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Password
                    </label>
                    <input type="password"
                        // placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                        placeholder='••••••••'
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = '••••••••'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Confirm password
                    </label>
                    <input type="password"
                        // placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                        placeholder='••••••••'
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = '••••••••'}
                        className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                    />
                </div>

                {/* <div className='flex flex-row gap-2'>
                    <input type="checkbox" />
                    <label htmlFor="">Remember me</label>
                </div> */}

                <button onClick={submitSignup} type="button" className='bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 rounded'>Submit</button>
            </form>

        </div>
    )
}

export default SignupCard