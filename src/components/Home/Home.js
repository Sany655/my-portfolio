import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


function Home() {
    return (
        <div className='md:grid md:grid-cols-10'>
            <header className='z-10 md:col-span-2 md:h-screen flex justify-around md:flex-col p-5 md:p-10 bg-black text-white sticky top-0'>
                <NavLink className='lg:text-4xl bold' to='/'>Profile</NavLink>
                <NavLink className='lg:text-4xl bold' to='/projects'>Projects</NavLink>
                <NavLink className='lg:text-4xl bold' to='/contact'>Contact me</NavLink>
                <NavLink className='lg:text-4xl bold' to='/blogs'>Blogs</NavLink>
            </header>
            <div className='md:col-span-8'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
