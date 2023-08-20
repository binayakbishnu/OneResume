import React from 'react'

import { auth, db } from "../Authentication/firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Profile() {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div>{user.uid}</div>
    )
}

export default Profile