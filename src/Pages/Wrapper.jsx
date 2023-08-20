import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'

import { auth, db } from "../Authentication/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import NavBar from '../Components/NavBar'

function Wrapper() {
    const [user, loading, error] = useAuthState(auth);
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const fetchUserData = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            // setName(data.name);
            setEmail(data.email);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserData();

        // localStorage.setItem(user?.uid, JSON.stringify(file));
        // setUrl(localStorage.getItem('recent-image'));
    }, [user, loading /* , file */]);
    return (
        <div className="h-[100vh] flex flex-col">
            <NavBar type={"loggedin"} email={user?.email} />
            <Outlet />
        </div>
    )
}

export default Wrapper