import React from 'react'
import { Nav, Sidebar } from '../components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main className='flex'>
            <Sidebar />
            <div className="w-full">
                <Nav />
                <Outlet />
            </div>
        </main>
    )
}

export default Layout