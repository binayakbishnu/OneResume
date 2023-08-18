import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function HomePage() {
    return (
        <div>
            HomePage
            <Outlet />
        </div>
    )
}

export default HomePage