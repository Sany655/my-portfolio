import React from 'react'

function Profile() {
    return (
        <div className=''>
            <div className="bg-slate-100 flex flex-col md:flex-row md:justify-between md:items-end p-10 md:p-20">
                <div className="flex items-center md:items-end flex-col md:flex-row">
                    <img src="https://lh3.googleusercontent.com/a-/AOh14Gi-Uk1CuZVyS2YmJ1y7Ym33PDcg5KkZAX072g46Wg=s288-p-rw-no" className='rounded-full' alt="" />
                    <div className="m-5">
                        <h1 className='text-2xl'>Mohammad Mazharul Alam</h1>
                        <p className='text-base text-zinc-500'>Undergraduate</p>
                        <p className='text-sm text-zinc-400'>MERN Developer</p>
                    </div>
                </div>
                <div className="">
                    <a href="./resume.pdf"><button className="bg-green-600 text-white p-2">Download Resume</button></a>
                </div>
            </div>
            <div className="p-10">
                <ul className='text-zinc-500'>
                    <li><a target='_blank' href="https://www.linkedin.com/in/mazharul-alam-728444201/">Linkedin</a></li>
                    <li><a target='_blank' href="https://github.com/sany655">Github</a></li>
                    <li>mazharulalam26@gmail.com</li>
                    <li>+8801876626011</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
