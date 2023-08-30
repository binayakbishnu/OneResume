import React, { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom'

import { auth, /* db */ } from "../Authentication/firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import NavBar from '../Components/NavBar'

function Wrapper() {
    const [user, loading, /* error */] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    },);
    return (
        <div className="h-[100vh] flex flex-col">
            <NavBar type={"loggedin"} email={user?.email} />
            <Outlet />
        </div>
    )
}

export default Wrapper