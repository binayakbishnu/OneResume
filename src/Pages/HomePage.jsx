import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'

import { auth, /* db */ } from "../Authentication/firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { GoCopy } from "react-icons/go";
import { ReactComponent as Loader } from '../assets/spinner.svg'

import axios from "axios";

function HomePage() {
    const [user, loading, /* error */] = useAuthState(auth);

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState(user?.email);
    /* const fetchUserData = async () => {
        console.log('fetching user data...');
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc?.docs[0]?.data();
            // setName(data.name);
            // setEmail(data?.email);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }; */

    const fileUploadRef = useRef(null);
    const uploadButtonTrigger = () => {
        fileUploadRef.current?.click();
    }

    const [uploadLoading, setUploadLoading] = useState(false);
    const handleUploadButtonState = async (btnState) => {
        setUploadLoading(btnState);
    }
    const fileUpload = async (e) => {
        if (!e.target.files) {
            alert('File not uploaded');
            return;
        }

        // setFile(e.target.files[0]);

        handleUploadButtonState(true).then(() => sendByAxios(e.target?.files[0])).then(() => viewFileTrigger()).then(() => handleUploadButtonState(false)).then(() => console.log('after'));
        // setUploadLoading(true
        // ).then(
        //     () => sendByAxios(e.target?.files[0])
        // ).then(
        //     () => viewFileTrigger()
        // ).then(
        //     () => setUploadLoading(false)
        // ).then(
        //     () => console.log('after')
        // );
    }

    const sendByAxios = async (file_) => {
        const formData = new FormData();
        // formData.append('user_id', uid);
        formData.append('user_id', user?.email);
        formData.append('fileData', file_);

        try {
            await axios.post(`https://oneresume-vd25.onrender.com/api/uploadResume`, formData).then(res => {
                console.log(res);
                setReceivedLink(null);
                // setTimeout(() => {
                //     window.location.reload(false);
                //     // console.log('This will run after 1 second!')
                // }, 2000);

            }).catch(e => {
                console.log(`frontend: axios error: ${e}`)
            }).finally(() => {
                console.log('frontend: axios completed');
            })
        }
        catch (e) {
            console.log(`frontend: ${e}`);
        }
    }

    const [receivedLink, setReceivedLink] = useState("no link");
    const viewFileTrigger = async () => {
        // await axios.get(`https://oneresume-vd25.onrender.com/`, {

        // }).then((res) => {
        //     setReceivedLink(res);
        //     console.log(receivedLink);
        // })
        if (user) {
            console.log(user?.email);
            /* try {
                await axios.post(`https://oneresume-vd25.onrender.com/api/getResume`, {
                    user_id: email,
                }).then((res) => {
                    console.log(typeof (res.data));
                    return res.data;
                    // return res.
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    // console.log('axios completed successfully');
                });
            } catch (err) {
                console.log(err);
            } */

            await receivedByAxios();
        }
    }

    const receivedByAxios = async () => {
        try {
            await axios.post(`https://oneresume-vd25.onrender.com/api/getResume`, {
                user_id: user?.email,
            }).then((res) => {
                // console.log(res);
                setReceivedLink(res.data);
                // return res.
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                // console.log('axios completed successfully');
            });
        } catch (err) {
            console.log(err);
        }
    }

    const copyLink = () => {
        let element = document.getElementById('linkToCopy');
        navigator.clipboard.writeText(element.innerText);
        alert("copied");
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        viewFileTrigger();
    }, [user, loading]);

    return (
        <div className='text-white flex flex-col flex-1'>

            <input ref={fileUploadRef} type="file"
                className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={fileUpload}
                onClick={(e) => { e.target.value = null }}
                accept="application/pdf"
            />

            <div className="homePageMain flex-1 flex flex-col items-center justify-center gap-[2%] w-[60%] md:w-[80%] m-auto">

                {/* <div className=" hidden md:flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF only</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={fileUpload} accept="application/pdf" />
                    </label>
                </div> */}

                <div className="py-5 w-full flex flex-col md:flex-row items-center justify-between md:justify-center gap-2 md:gap-[2%]">
                    <button className={`bg-[#191919] ${uploadLoading ? '' : 'lg:hover:bg-[#202020]'} rounded p-4 py-6 w-full md:w-[30%] lg:w-[25%]
                    flex flex-row justify-center items-center h-[80px]`}
                        onClick={uploadButtonTrigger}
                        disabled={uploadLoading ? true : false}
                    >
                        {uploadLoading ?
                            // <span clasName="h=[100px]">••••••••</span>
                            <Loader
                                className="animate-spin duration-500 infinite linear"
                            />
                            :
                            'Upload resume'}
                    </button>

                    {/* <button
                        className="bg-[#191919] lg:hover:bg-[#202020] rounded p-4 py-6 w-full md:w-[30%] lg:w-[25%]"
                    // onClick={viewFileTrigger}
                    >
                        View resume
                    </button> */}
                </div>

                <div className={
                    `${receivedLink === "no link" || receivedLink === "" || receivedLink === undefined || receivedLink === null ?
                        'text-[rgba(0,0,0,0)] cursor-default' :
                        'text-white'} m-0 text-center w-full`}>
                    <p id="linkToCopy" className={
                        `mb-1 flex flex-row items-stretch justify-between gap-2 text-center text-xs m-auto ${receivedLink === "no link" || receivedLink === "" || receivedLink === undefined || receivedLink === null ?
                            '' :
                            'cursor-pointer bg-[rgb(35,35,35)] hover:bg-[rgb(50,50,50)]'}  ps-2 w-fit rounded`
                    }
                    >
                        <span
                            onClick={copyLink}
                        >{receivedLink}</span>
                        <span className={`p-1 ${receivedLink === "no link" || receivedLink === "" || receivedLink === undefined || receivedLink === null ?
                            '' :
                            'bg-[rgba(100,100,100,0.5)]'} flex flex-col justify-center p-auto rounded-r`}
                            onClick={copyLink}><GoCopy /></span>
                    </p>
                    <p className={`text-sm`}>(This link will not change with new file uploads)</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage