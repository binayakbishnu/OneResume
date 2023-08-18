import React from 'react'

export function LoginLink({style}) {
    return (
        <a href="/login" className={style}>
            Log in <span aria-hidden="true">&rarr;</span>
        </a>
    )
}
export function SignupLink({style}) {
    return (
        <a href="/signup" className={style}>
            Log in <span aria-hidden="true">&rarr;</span>
        </a>
    )
}