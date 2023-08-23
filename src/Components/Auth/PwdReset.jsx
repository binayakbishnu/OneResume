import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { auth, sendPasswordReset } from "../../Authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function PwdReset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const submitReset = () => {
        
        if (!email) {
            alert("Please enter your email");
            return;
        }

        console.log('submit reset');
        sendPasswordReset(email);
    }
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
    }, [user, loading]);
    return (
        <div className="bg-[#191919] mt-2 lg:mt-5 flex-1 flex flex-col justify-start gap-5 rounded p-5">
            <form className='flex flex-col gap-5'>
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

                <Link to="/login" className='underline w-fit'>Go back</Link>

                <button onClick={submitReset} type="button" className='bg-[#202020] hover:bg-[#222222] w-[100%] py-2 px-5 rounded'>Submit</button>
            </form>
        </div>
    );
}

export default PwdReset