import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Authentication/firebase';

import NavBar from '../Components/NavBar';

import binayakPhoto from '../assets/binayakbishnu.jpg';
import subhanuPhoto from '../assets/subhanuroy.jpeg'
import { BsGithub, BsGlobe2, BsLinkedin, BsMedium } from 'react-icons/bs';

function About() {
    const [user, loading, /* error */] = useAuthState(auth);
    const [loggedInState, setLoggedInState] = useState(false);

    const setNavbar = (state) => {
        // console.log('setNavbar()');
        setLoggedInState(state);
    }

    useEffect(() => {
        if (loading) return;
        if (user) setNavbar(true);
    },);
    return (
        <>
            <NavBar type={loggedInState ? "loggedin" : "loggedout"} email={loggedInState ? user?.email : ""} />
            <div className='text-white flex flex-col flex-1'>
                <div className='bg-[#191919] w-[80%] mx-auto mt-[5%] rounded p-5'>
                    <h3 className='text-2xl md:text-3xl'>About OneResume</h3>
                    <hr />
                    <div className='mt-5'>
                        <ul>
                            <li>Users can upload updated resumes without having to generate new links or create copies.</li>
                            <li>Removes the risk of the old link breaking, the same link shows the new file.</li>
                            <li>Built with ReactJs, Nodejs, and Firebase for authentication and storage.</li>
                        </ul>
                    </div>
                </div>
                <div className='bg-[#191919] w-[80%] mx-auto mt-[5%] rounded p-5'>
                    <h3 className='text-2xl md:text-3xl'>Who are we?</h3>
                    <hr />
                    <div className='mt-5 flex flex-col md:flex-row gap-2 md:gap-auto justify-between items-start'>
                        <div className='rounded w-full md:w-[46%] p-2 flex flex-col md:flex-row justify-between items-stretch gap-2 md:gap-4 bg-[#222222]'>
                            <div className='flex flex-row items-center gap-2 md:gap-4'>
                                <img src={binayakPhoto} alt="binayak" className='w-[60px] md:w-auto md:h-[100px] md:my-2'
                                    style={{
                                        "borderRadius": "100px"
                                    }}
                                />
                                <div>
                                    <p className='text-lg font-bold'>Binayak Bishnu</p>
                                    <p className='text-sm italic'>Frontend Web Developer</p>
                                </div>
                            </div>
                            {/* social media */}
                            <div className='mt-2 md:mt-0 flex flex-row md:flex-col justify-around px-1'>
                                <a href="https://binayakbishnu.web.app" target="_blank" rel="noreferrer">
                                    <BsGlobe2 />
                                </a>
                                <a href="https://www.linkedin.com/in/binayakbishnu" target='_blank' rel="noreferrer">
                                    <BsLinkedin />
                                </a>
                                <a href="https://github.com/binayakbishnu" target='_blank' rel="noreferrer">
                                    <BsGithub />
                                </a>
                                <a href="https://medium.com/@binayakbishnu" target='_blank' rel="noreferrer">
                                    <BsMedium />
                                </a>
                            </div>
                        </div>
                        <div className='rounded w-full md:w-[46%] p-2 flex flex-col md:flex-row justify-between items-stretch gap-2 md:gap-4 bg-[#222222]'>
                            <div className='flex flex-row items-center gap-2 md:gap-4'>
                                <img src={subhanuPhoto} alt="subhanu" className='w-[60px] md:w-auto md:h-[100px] md:my-2'
                                    style={{
                                        "borderRadius": "100px"
                                    }}
                                />
                                <div>
                                    <p className='text-lg font-bold'>Subhanu S Roy</p>
                                    <p className='text-sm italic'>Backend Web Developer</p>
                                </div>
                            </div>
                            <div className='mt-2 md:mt-0 flex flex-row md:flex-col justify-around px-1'>
                                <a href="https://www.linkedin.com/in/subhanusroy" target='_blank' rel="noreferrer">
                                    <BsLinkedin />
                                </a>
                                <a href="https://github.com/SubhanuSRoy" target='_blank' rel="noreferrer">
                                    <BsGithub />
                                </a>
                                <a href="https://medium.com/@subhanusroy" target='_blank' rel="noreferrer">
                                    <BsMedium />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About