import React from 'react'

import { logout } from "../../Authentication/firebase";

export function LoginLink({style}) {
    return (
        <a href="/login" className={style}>
            Log in <span aria-hidden="true">&rarr;</span>
        </a>
    )
}
export function LogoutLink({style}) {
    const submitLogout = () => {
        console.log('submit logout');
        logout();
    }
    return (
        <button className={style} onClick={submitLogout}>
            Log out <span aria-hidden="true">&rarr;</span>
        </button>
    )
}
export function SignupLink({style}) {
    return (
        <a href="/signup" className={style}>
            Log in <span aria-hidden="true">&rarr;</span>
        </a>
    )
}