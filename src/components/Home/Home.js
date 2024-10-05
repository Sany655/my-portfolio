import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const images = [
    'https://picsum.photos/id/237/400/300',
    'https://picsum.photos/id/1074/400/300',
    'https://picsum.photos/id/837/400/300',
    'https://picsum.photos/id/936/400/300',
    // Add more image URLs here
];

function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">Your Name/Portfolio Title</h1>
                <nav>
                    {/* Add navigation links here */}
                </nav>
            </header>
            <main className="container mx-auto px-4 py-16 flex flex-wrap justify-center">
                {images.map((image) => (
                    <div key={image} className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <img
                            src={image}
                            alt="Project Image"
                            className="rounded-lg shadow-md object-cover w-full h-64 hover:opacity-75 transition duration-300 ease-in-out"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">Project Title</h3>
                            <p className="text-gray-700 mb-4">Brief project description highlighting key achievements or skills.</p>
                            <a href="#" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                                Learn More
                            </a>
                        </div>
                    </div>
                ))}
            </main>
            <section className="bg-gray-200 py-8">
                <h2 className="text-2xl font-bold text-center mb-4">Contact Me</h2>
                <form className="flex flex-col justify-center items-center mx-auto max-w-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Your Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Your Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Write your message here"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                    >
                        Send Message
                    </button>
                </form>
            </section>
            <footer className="bg-gray-200 text-center py-4">
                <p>&copy; {new Date().getFullYear()} Your Name</p>
            </footer>
        </div>
    );
    // return (
    // <div className='md:grid md:grid-cols-10'>
    //     <header className='z-10 md:col-span-2 md:h-screen flex justify-around md:flex-col p-5 md:p-10 bg-black text-white sticky top-0'>
    //         <NavLink className='lg:text-4xl bold' to='/'>Profile</NavLink>
    //         <NavLink className='lg:text-4xl bold' to='/projects'>Projects</NavLink>
    //         <NavLink className='lg:text-4xl bold' to='/contact'>Contact me</NavLink>
    //         <a href='https://symplesocial.web.app/' className='lg:text-4xl bold' to='/blogs'>Blogs</a>
    //     </header>
    //     <div className='md:col-span-8'>
    //         <Outlet />
    //     </div>
    // </div>
    // )
}

export default Home
