import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { auth, /* db */ } from "../Authentication/firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// import NavBar from '../Components/NavBar';

function Profile() {
    const [user, loading, /* error */] = useAuthState(auth);

    /* const [email, setEmail] = useState("");
    const fetchUserData = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc?.docs[0]?.data();
            // setName(data.name);
            setEmail(data?.email);
        } catch (err) {
            // console.error(err);
            // alert("An error occured while fetching user data");
        }
    }; */

    const navigate = useNavigate()
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        // fetchUserData();
    }, [user, loading /* , file */]);
    return (
        <div className='text-white flex flex-col flex-1'>
            {/* <NavBar /> */}
            {/* {user?.uid} */}
            <div className='bg-[#191919] w-[80%] md:w-[70%] lg:w-[50%] mx-auto mt-[5%] rounded p-5'>
                <h3 className='text-2xl md:text-3xl'>User details</h3>
                <hr />
                <p className='mt-5'>
                    Email: <span className='hidden md:inline'>{user?.email}</span>
                </p>
                <p className='block md:hidden'>
                    {user?.email}
                </p>
                {/* <p className='mt-5'>
                    Key: <span className='hidden md:inline cursor-pointer hover:bg-[#252525]' onClick={() => { navigator.clipboard.writeText(user?.uid) }}>
                        {user?.uid}
                    </span>
                </p>
                <p className='block md:hidden cursor-pointer hover:bg-[#252525] w-fit' onClick={() => { navigator.clipboard.writeText(user?.uid) }}>
                    {user?.uid}
                </p> */}
            </div>
        </div>
    )
}

export default Profile