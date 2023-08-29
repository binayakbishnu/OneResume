import React, { useEffect, useState } from 'react'
import { /* Link, */ useNavigate } from 'react-router-dom'

import { AiFillCheckCircle, AiOutlineGoogle } from 'react-icons/ai'
import { ReactComponent as Loader } from '../../assets/spinner.svg'

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

    const [signupLoading, setSignupLoading] = useState(false);
    const handleSignupBtnState = async (loginState) => {
        setSignupLoading(loginState);
    }

    const submitSignup = async () => {
        if (email === "") {
            setEmailValid(false);
            setEmailError("Enter email");
        }
        else if (password === "") {
            setPasswordValid(false);
            // setPasswordError("Enter password");
        }
        else if (confirmPassword === "") {
            setConfirmPasswordValid(false);
            setConfirmPasswordError("Enter confirm password");
        }
        else if (emailValid && passwordValid && confirmPasswordValid) {
            const submitError = await registerWithEmailAndPassword(/* name,  */email, password);
            console.warn(submitError);
            if (submitError !== "") {
                setEmailValid(false);
                setEmailError("Email ID already exists");
            }
            // else if(submitError !== ""){
            //     setEmailValid(false);
            //     setEmailError("Check email");
            // }
        }
        else if (emailError === "Email ID already exists") {
            const submitError = registerWithEmailAndPassword(/* name,  */email, password);
            // console.warn(submitError);
            if (submitError !== "") {
                setEmailValid(false);
                setEmailError("Email ID already exists");
            }
        }
        else {
            alert("Invalid fields");
        }
    }

    const signupButtonTrigger = async () => {
        handleSignupBtnState(true).then(() => submitSignup()).then(() => handleSignupBtnState(false));
    }

    const [emailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState("no error");
    const validateEmail = () => {
        if (email === "") {
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
    // const [passwordError, setPasswordError] = useState("no error");
    const [lowerFulfilled, setLowerFulfilled] = useState(false);
    const [upperFulfilled, setUpperFulfilled] = useState(false);
    const [numberFulfilled, setNumberFulfilled] = useState(false);
    const [specialFulfilled, setSpecialFulfilled] = useState(false);
    const [countFulfilled, setCountFulfilled] = useState(false);
    const validatePassword = () => {
        if (password === "") {
            setPasswordValid(true);
            // setPasswordError("no error");
            // return true;
        }
        if (/(?=.*[a-z])/.test(password)) {
            setLowerFulfilled(true);
        }
        else {
            setLowerFulfilled(false);
        }

        if (/(?=.*[A-Z])/.test(password)) {
            setUpperFulfilled(true);
        }
        else {
            setUpperFulfilled(false);
        }

        if (/(?=.*\d)/.test(password)) {
            setNumberFulfilled(true);
        }
        else {
            setNumberFulfilled(false);
        }

        if (/(?=.*[@#$!%*?&])/.test(password)) {
            setSpecialFulfilled(true);
        }
        else {
            setSpecialFulfilled(false);
        }

        if (/.{8,}/.test(password)) {
            setCountFulfilled(true);
        }
        else {
            setCountFulfilled(false);
        }

        if ((password !== "") && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(password))) {
            setPasswordValid(true);
            // setPasswordError("no error");
            return true;
        }
        // else {
        //     setPasswordValid(false);
        //    // setPasswordError("Invalid password");
        //     return false;
        // }
    }

    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState("no error");
    const validateConfirmPassword = () => {
        /* if (confirmPassword == "") {
            setConfirmPasswordValid(true);
            setConfirmPasswordError("no error");
            return true;
        }
        else */ if ((confirmPassword === password) && (passwordValid)) {
            setConfirmPasswordValid(true);
            setConfirmPasswordError("no error");
            return true;
        }
        else if ((confirmPassword === password) && (passwordValid) && (confirmPassword !== "")) {
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
        if (error) return;
        if (user) navigate("/home");

        validateEmail();
        validatePassword();
        validateConfirmPassword();
    }, [user, loading, email, password, confirmPassword]);

    return (
        <div className='bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5 pb-6 lg:pb-6'>
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
                    <p className={`p-0 m-0 text-[0.8em] ${emailValid ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{emailError}</p>
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
                    <p className={`p-0 m-0 text-[0.8em] ${lowerFulfilled ? 'text-green-500' : 'text-red-500'}`}>Atleast one lowercase</p>
                    <p className={`p-0 m-0 text-[0.8em] ${upperFulfilled ? 'text-green-500' : 'text-red-500'}`}>Atleast one uppercase</p>
                    <p className={`p-0 m-0 text-[0.8em] ${numberFulfilled ? 'text-green-500' : 'text-red-500'}`}>Atleast one number</p>
                    <p className={`p-0 m-0 text-[0.8em] ${specialFulfilled ? 'text-green-500' : 'text-red-500'}`}>Atleast one special character</p>
                    <p className={`p-0 m-0 text-[0.8em] ${countFulfilled ? 'text-green-500' : 'text-red-500'}`}>Minimum 8 characters</p>

                    {/* <p className={`p-0 m-0 text-[0.8em] ${passwordValid ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{passwordError}</p> */}
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
                    <p className={`p-0 m-0 text-[0.8em] ${confirmPasswordValid ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{confirmPasswordError}</p>
                </div>

                {/* <div className='flex flex-row gap-2'>
                    <input type="checkbox" />
                    <label htmlFor="">Remember me</label>
                </div> */}

                <button onClick={signupButtonTrigger} type="button" className={`h-[45px] flex flex-row justify-center items-center bg-[#202020] ${signupLoading ? '' : 'hover:bg-[#222222]'} w-[100%] py-2 px-5 rounded`}
                    disabled={signupLoading ? true : false}
                >
                    {signupLoading ?
                        // <span clasName="h=[100px]">••••••••</span>
                        <Loader
                            className="animate-spin duration-500 infinite linear"
                        />
                        :
                        'Signup'
                    }
                </button>
            </form>

        </div>
    )
}

export default SignupCard