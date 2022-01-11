import React from 'react'
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <div className='flex justify-end border-b border-black p-2 bg-black text-white'>
            <nav className=''>
                <NavLink to="/" className='px-2'>Home</NavLink>
                <NavLink to="/invoices" className='px-2'>Invoices</NavLink>
                <NavLink to="/expenses" className='px-2'>Expenses</NavLink>
            </nav>
        </div>
    )
}

export default Header
