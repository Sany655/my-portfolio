import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


function Home() {
    return (
        <div className='md:grid md:grid-cols-10'>
            <header className='md:col-span-2 md:h-screen flex justify-around md:flex-col md:p-10 bg-black text-white'>
                <NavLink to='/' className=''>Profile</NavLink>
                <NavLink to='/projects' className=''>Projects</NavLink>
                <NavLink to='/contact' className=''>Contact</NavLink>
            </header>
            <div className='md:col-span-8'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
