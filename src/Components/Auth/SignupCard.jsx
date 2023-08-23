import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AiFillCheckCircle, AiOutlineGoogle } from 'react-icons/ai'

import { auth, registerWithEmailAndPassword, signInWithGoogle, } from "../../Authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { BsCheckCircleFill } from 'react-icons/bs';

function SignupCard() {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const googleSignup = () => {
        console.log('google signup');
        signInWithGoogle();
    }
    const submitSignup = () => {
        if (emailValid && passwordValid && confirmPasswordValid) {
            console.log('submit signup');
            registerWithEmailAndPassword(/* name,  */email, password);
        }
        else {
            alert("Invalid fields");
        }
    }

    const [emailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState("no error");
    const validateEmail = () => {
        if (email == "") {
            setEmailValid(true);
            setEmailError("no error");
            return true;
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailValid(true);
            setEmailError("no error");
            return true;
        }
        else {
            setEmailValid(false);
            setEmailError("Invalid email address");
            return false;
        }
    }

    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState("no error");
    const validatePassword = () => {
        if (password == "") {
            setPasswordValid(true);
            setPasswordError("no error");
            return true;
        }
        else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(password)) {
            setPasswordValid(true);
            setPasswordError("no error");
            return true;
        }
        else {
            setPasswordValid(false);
            setPasswordError("Invalid password");
            return false;
        }
    }

    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState("no error");
    const validateConfirmPassword = () => {
        if (confirmPassword == "") {
            setConfirmPasswordValid(true);
            setConfirmPasswordError("no error");
            return true;
        }
        else if ((confirmPassword === password) && (passwordValid)) {
            setConfirmPasswordValid(true);
            setConfirmPasswordError("no error");
            return true;
        }
        else {
            setConfirmPasswordValid(false);
            setConfirmPasswordError("Passwords don't match");
            return false;
        }
    }

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
        validateEmail();
        validatePassword();
        validateConfirmPassword();
    }, [user, loading, email, password, confirmPassword]);

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
                    <div className='flex flex-row items-center justify-between rounded border boder-white pe-2'>
                        <input type="email"
                            placeholder='example@domain.com'
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "example@domain.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-[100%] mx-auto px-5 pe-1 py-2 bg-[rgba(0,0,0,0)] text-gray-500 border-none outline-none'
                        />
                        {/* <BsCheckCircleFill className={`${emailValid ? 'text-green-500' : 'text-red-500'}`} /> */}
                        <AiFillCheckCircle className={`${emailValid ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <p className={`p-0 m-0 text-[0.8em] ${emailValid || email === "" ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{emailError}</p>
                </div>

                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Password
                    </label>
                    <div className='flex flex-row items-center justify-between rounded border boder-white pe-2'>
                        <input type="password"
                            // placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                            placeholder='••••••••'
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = '••••••••'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-[100%] mx-auto px-5 pe-1 py-2 bg-[rgba(0,0,0,0)] text-gray-500 border-none outline-none'
                        />
                        <AiFillCheckCircle className={`${passwordValid ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <p className={`p-0 m-0 text-[0.8em] ${(passwordValid || password === "") ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{passwordError}</p>
                </div>

                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Confirm password
                    </label>
                    <div className='flex flex-row items-center justify-between rounded border boder-white pe-2'>
                        <input type="password"
                            // placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                            placeholder='••••••••'
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = '••••••••'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-[100%] mx-auto px-5 pe-1 py-2 bg-[rgba(0,0,0,0)] text-gray-500 border-none outline-none'
                        />
                        <AiFillCheckCircle className={`${confirmPasswordValid ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <p className={`p-0 m-0 text-[0.8em] ${(confirmPasswordValid || confirmPassword === "") ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{confirmPasswordError}</p>
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