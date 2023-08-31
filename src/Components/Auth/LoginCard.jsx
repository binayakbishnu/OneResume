import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AiOutlineGoogle } from 'react-icons/ai'
import { ReactComponent as Loader } from '../../assets/spinner.svg'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../Authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [googleError, setGoogleError] = useState(false);
    const [googleErrorMessage, setGoogleErrorMessage] = useState("no error");
    const googleLogin = async () => {
        await signInWithGoogle().then((response) => { setGoogleError(true); setGoogleErrorMessage(response.message); });
    }

    const [loginLoadingGoogle, setLoginLoadingGoogle] = useState(false);
    const handleGoogleLoginState = async (loginState) => {
        setLoginLoadingGoogle(loginState);
    }

    const googleLoginTrigger = async () => {
        handleGoogleLoginState(true).then(() => googleLogin()).then(() => handleGoogleLoginState(false));
    }

    const [loginLoading, setLoginLoading] = useState(false);
    const handleLoginBtnState = async (loginState) => {
        setLoginLoading(loginState);
    }

    const submitLogin = async () => {
        if (email === "") {
            setLoginEmailValid(false);
            setLoginEmailError("Enter email");
            return false;
        }
        if (password === "") {
            setLoginEmailValid(true);
            setLoginPasswordValid(false);
            setLoginPasswordError("Enter password");
            return false;
        }
        if (loginEmailValid && loginPasswordValid) {
            const submitError = await logInWithEmailAndPassword(email, password);
            // console.warn(submitError);
            if (submitError === "User not found") {
                setLoginEmailValid(false);
                setLoginEmailError("Email ID does not exist");
            }
            else if (submitError === "Please check your password") {
                setLoginPasswordValid(false);
                setLoginPasswordError("Incorrect password");
            }
        }
    }

    const loginBtnTrigger = async () => {
        handleLoginBtnState(true).then(() => submitLogin()).then(() => handleLoginBtnState(false));
    }

    const [loginEmailValid, setLoginEmailValid] = useState(true);
    const [loginEmailError, setLoginEmailError] = useState("no error");
    const validateLoginEmail = () => {
        if (email !== "") {
            setLoginEmailValid(true);
        }
    }

    const [loginPasswordValid, setLoginPasswordValid] = useState(true);
    const [loginPasswordError, setLoginPasswordError] = useState("no error");
    const validateLoginPassword = () => {
        if (password !== "") {
            setLoginPasswordValid(true);
        }
    }

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (error) return;
        if (user) navigate("/home");

        validateLoginEmail();
        validateLoginPassword();
    }, [user, loading, email, password]);

    return (
        <div className='bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5 pb-6 lg:pb-10'>
            <div className='lg:mb-0'>
                <button onClick={googleLoginTrigger} className='bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 flex flex-row items-center justify-center rounded gap-2'>
                    <AiOutlineGoogle className='text-2xl' />
                    {loginLoadingGoogle ?
                        // <span clasName="h=[100px]">••••••••</span>
                        <Loader
                            className="animate-spin duration-500 infinite linear"
                        />
                        :
                        'Google login'
                    }
                </button>
                <p className={`p-0 m-0 text-[0.8em] ${googleError ? 'text-red-500' : 'text-[rgba(0,0,0,0)]'}`}>{googleErrorMessage}</p>
            </div>
            {/* <h2
                className='w-[100%] text-center border border-0 border-b-[1px] border-dashed border-white leading-[0.1em]'
            >
                <span className='bg-[#191919] px-[4px]'>OR</span>
            </h2> */}

            <form className='flex flex-col'>
                <div>
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
                    <p className={`p-0 m-0 text-[0.8em] ${loginEmailValid ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{loginEmailError}</p>
                </div>

                <div className='mt-5'>
                    <div className='relative'>
                        <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                            Password
                        </label>
                        <input type="password"
                            // placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                            placeholder='••••••••'
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "••••••••"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-[100%] mx-auto px-5 py-2 rounded bg-[rgba(0,0,0,0)] border boder-white text-gray-500'
                        />
                    </div>
                    <p className={`p-0 m-0 text-[0.8em] ${loginPasswordValid ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{loginPasswordError}</p>
                </div>
                <Link to="/forgotpassword" className=' mt-2 underline w-fit'>Forgot Password?</Link>

                {/* <div className='flex flex-row gap-2'>
                    <input type="checkbox" />
                    <label htmlFor="">Remember me</label>
                </div> */}

                <button onClick={loginBtnTrigger} type="button"
                    className={`h-[45px] flex flex-row justify-center items-center mt-5 bg-[#202020] ${loginLoading ? '' : 'hover:bg-[#222222]'} w-[100%] py-2 px-5 rounded`}
                    disabled={loginLoading ? true : false}
                >
                    {loginLoading ?
                        // <span clasName="h=[100px]">••••••••</span>
                        <Loader
                            className="animate-spin duration-500 infinite linear"
                        />
                        :
                        'Login'
                    }
                </button>
            </form>

        </div>
    )
}

export default LoginCard