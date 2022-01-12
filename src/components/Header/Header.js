import React from 'react'
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <div className=''>
            <nav className='flex justify-end border-b border-black p-2 bg-black text-white'>
                <NavLink to="/" className='px-2 lg:px-5'>Home</NavLink>
                <NavLink to="/blogs" className='px-2 lg:px-5'>Blogs</NavLink>
            </nav>
        </div>
    )
}

export default Header
