import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { auth, sendPasswordReset } from "../../Authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ReactComponent as Loader } from '../../assets/spinner.svg'

function PwdReset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [miscError, setMiscError] = useState(false);
    const [miscErrorMessage, setMiscErrorMessage] = useState("");

    const [resetLoading, setResetLoading] = useState(false);
    const handleResetBtnState = async (btnState) => {
        setResetLoading(btnState);
    }

    const checkResponse = async (response_) => {
        setMiscError(false);
        if (response_ === "Password reset link sent!") {
            // pop up
            // console.log("sent");
        }
        else if (response_ === "User not found") {
            setMiscError(true);
            setMiscErrorMessage("Email ID does not exist");
        }
        else if (response_ === "Check the Email ID") {
            setMiscError(true);
            setMiscErrorMessage("Check the Email ID");
        }
        else {
            setMiscError(true);
            setMiscErrorMessage(response_);
        }
    }

    // const [response, setResponse] = useState("");
    const submitRequest = async () => {
        let response_ = await sendPasswordReset(email);
        checkResponse(response_);
    }

    const [showPopup, setShowPopup] = useState(false);
    const triggerPopup = async () => {
        if (miscError) return;
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate("/login");
        }, 2000);
    }

    const resetTrigger = async () => {
        if (!email) {
            // alert("Please enter your email");
            setMiscError(true);
            setMiscErrorMessage("Please enter your email");

            return;
        }

        // console.log('submit reset');

        // let response_ = await sendPasswordReset(email);
        // checkResponse(response_);
        handleResetBtnState(true).then(() => submitRequest()).then(() => handleResetBtnState(false)).then(() => triggerPopup());
    }
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (error) return;
        if (user) navigate("/home");
    }, [user, loading]);
    return (
        <div className="bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5">
            <form onSubmit={(e) => {e.preventDefault();}} className='flex flex-col gap-5'>
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
                    <p className={`p-0 m-0 text-[0.8em] ${miscError ? 'text-red-500' : 'text-[rgba(0,0,0,0)]'}`}>{miscErrorMessage}</p>
                </div>

                <Link to="/login" className='underline w-fit'>Go back</Link>

                <button onClick={resetTrigger} type="button" className={`bg-[#202020] ${resetLoading ? '' : 'lg:hover:bg-[#222222]'} w-[100%] py-2 px-5 rounded
                flex flex-row justify-center items-center h-[45px]`}
                    disabled={resetLoading ? true : false}
                >
                    {resetLoading ?
                        // <span clasName="h=[100px]">••••••••</span>
                        <Loader
                            className="animate-spin duration-500 infinite linear"
                        />
                        :
                        'Submit'
                    }
                </button>
            </form>

            <div className={`${showPopup ? 'block' : 'hidden'} fixed text-white left-[0%] right-[0%] top-[0%] bottom-[0%] m-auto h-fit w-fit bg-[#222222] rounded p-8`}>
                Password reset link sent!
            </div>
        </div>
    );
}

export default PwdReset