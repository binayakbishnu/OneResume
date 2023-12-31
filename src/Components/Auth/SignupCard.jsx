import React, { useEffect, useState } from 'react'
import { /* Link, */ useNavigate } from 'react-router-dom'

import { AiFillCheckCircle, AiOutlineGoogle } from 'react-icons/ai'
import { ReactComponent as Loader } from '../../assets/spinner.svg'

import { auth, registerWithEmailAndPassword, signInWithGoogle, db } from "../../Authentication/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// import { BsCheckCircleFill } from 'react-icons/bs';


function SignupCard() {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [googleError, setGoogleError] = useState(false);
    const [googleErrorMessage, setGoogleErrorMessage] = useState("no error");
    const googleSignup = async () => {
        await signInWithGoogle().then((response) => { setGoogleError(true); setGoogleErrorMessage(response.message); });
    }

    const [signupLoadingGoogle, setSignupLoadingGoogle] = useState(false);
    const handleGoogleSignupState = async (signupState) => {
        setSignupLoadingGoogle(signupState)
    }

    const googleSignupTrigger = async () => {
        handleGoogleSignupState(true).then(() => googleSignup()).then(() => handleGoogleSignupState(false));
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
        else if (identifier === "") {
            setIdentifierValid(false);
            setIdentifierError("Enter id");
        }
        else if (identifierValid && emailValid && passwordValid && confirmPasswordValid) {
            const submitError = await registerWithEmailAndPassword(identifier, email, password);
            // console.warn(submitError);
            if (submitError === "") {
                //
            }
            else if (submitError === "Email ID already exists") {
                setEmailValid(false);
                setEmailError(submitError);
                return false;
            }
            else {
                console.warn(submitError);
                return false;
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
        else if (!identifierValid) {
            setIdentifierError("Check identifier validity");
        }
        else {
            setIdentifierValid(false);
            setIdentifierError("Invalid fields");
            // alert("Invalid fields");
        }
    }

    const signupButtonTrigger = async () => {
        handleSignupBtnState(true).then(() => submitSignup()).then(() => handleSignupBtnState(false));
    }

    const fetchUserData = async () => {
        try {
            const q = query(collection(db, "identifiers"), where("value", "==", identifier));
            const docs = await getDocs(q);
            // console.log(docs.docs.length);
            // const data = docs?.docs[0]?.data();
            // console.log(data)
            // if ((data?.identifier !== undefined) && (data?.identifier !== "")) {
                if(docs?.docs?.length !== 0){
                setIdentifierValid(false);
                setIdentifierError("Identifier already taken");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [identifierValid, setIdentifierValid] = useState(false);
    const [identifierError, setIdentifierError] = useState("");
    const validateIdentifier = async () => {
        if (identifier === "") {
            setIdentifierValid(false);
            setIdentifierError("Choose an identifier");
            return true;
        }
        else if (/^[a-zA-Z0-9]{1,10}$/.test(identifier)) {
            setIdentifierValid(true);
            setIdentifierError("");

            await fetchUserData();

            return true;
        }
        else if (identifier.length > 8) {
            setIdentifierValid(false);
            setIdentifierError("max 10 characters");
            return false;
        }
        else {
            setIdentifierValid(false);
            setIdentifierError("Only a-z, A-Z, 0-9");
            return false;
        }
    }

    const [emailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState("no error");
    const validateEmail = () => {
        if (email === "") {
            setEmailValid(true);
            setEmailError("no error");
            return true;
        }
        //eslint-disable-next-line
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
        // validateIdentifier();
    }, [user, loading, error, email, password, confirmPassword]);

    return (
        <div className='bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5 pb-6 lg:pb-6'>
            <div className='lg:mb-0'>
                <button onClick={googleSignupTrigger} className='bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 flex flex-row items-center justify-center rounded gap-2'>
                    <AiOutlineGoogle className='text-2xl' />
                    {signupLoadingGoogle ?
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

                <div className='relative'>
                    <label htmlFor="" className='absolute top-[-0.8rem] left-[1rem] z-1 text-white py-0 px-[5px] bg-[#191919]'>
                        Unique ID
                    </label>
                    <div className='flex flex-row items-center justify-between rounded border border-white pe-2'>
                        <input type="text"
                            placeholder='myidentifier'
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "myidentifier"}
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className='w-[100%] mx-auto px-5 pe-1 py-2 bg-[rgba(0,0,0,0)] text-gray-500 border-none outline-none'
                        />
                        {/* <BsCheckCircleFill className={`${identifierValid ? 'text-green-500' : 'text-red-500'}`} /> */}
                        {/* <AiFillCheckCircle className={`${identifierValid ? 'text-green-500' : 'text-red-500'}`} /> */}
                        <span className={`hover:cursor-pointer hover:underline ${identifierValid ? 'text-green-500' : 'text-red-500'}`}
                            onClick={validateIdentifier}>
                            Check
                        </span>
                    </div>
                    <p className={`p-0 m-0 text-[0.8em] ${identifierValid ? 'text-[rgba(0,0,0,0)]' : 'text-red-500'}`}>{identifierError}</p>
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