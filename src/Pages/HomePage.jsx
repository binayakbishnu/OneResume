import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom'

import NavBar from "../Components/NavBar";

import { auth, db } from "../Authentication/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function HomePage() {
    const [user, loading, error] = useAuthState(auth);
    // const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            // setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const fileUploadRef = useRef(null);
    const uploadButtonTrigger = () => {
        fileUploadRef.current?.click();
    }

    const [file, setFile] = useState(null);
    const fileUpload = (e) => {
        if (!e.target.files) {
            alert('File not uploaded');
            return;
        }
        setFile(e.target.files[0]);
        // localStorage.setItem(user?.uid, JSON.stringify(file));
    }

    const viewFileTrigger = () => {
        // alert(JSON.parse(localStorage.getItem(user?.uid)));
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();

        // localStorage.setItem(user?.uid, JSON.stringify(file));
        // setUrl(localStorage.getItem('recent-image'));
    }, [user, loading /* , file */]);
    return (
        <div className='text-white flex flex-col h-[100vh]'>
            <NavBar type={"loggedin"} email={user?.email} />

            <input ref={fileUploadRef} type="file"
                className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={fileUpload}
            />
            <div className="homePageMain flex-1 flex flex-col items-center justify-center gap-[2%]">

                {/* <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                </div> */}
                <div className="py-5 w-full flex flex-col md:flex-row items-center justify-between md:justify-center gap-2 md:gap-[2%]">
                    <button className="bg-[#191919] lg:hover:bg-[#202020] rounded p-4 py-6 w-[60%] md:w-[30%] lg:w-[25%]" onClick={uploadButtonTrigger}>Upload resume</button>
                    {/* <UploadFile userData={user} /> */}
                    <button
                        className="bg-[#191919] lg:hover:bg-[#202020] rounded p-4 py-6 w-[60%] md:w-[30%] lg:w-[25%]"
                        onClick={viewFileTrigger}
                    >View resume</button>
                </div>
                <p className={file ? `text-white` : `text-[rgba(0,0,0,0)]`}>{file ? `${file.name}` : `file name`}</p>
            </div>





            <Outlet />
        </div>
    )
}

export default HomePage