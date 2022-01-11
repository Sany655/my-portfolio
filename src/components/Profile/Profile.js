import React from 'react'

function Profile() {
    return (
        <div className=''>
            <div className="bg-slate-100 flex flex-col md:flex-row md:justify-between md:items-end p-10 md:p-20">
                <div className="flex items-center md:items-end flex-col md:flex-row">
                    <img src="./me.webp" className='rounded-full' alt="" />
                    <div className="m-5">
                        <h1 className='text-2xl'>Mohammad Mazharul Alam</h1>
                        <p className='text-base text-zinc-500'>Undergraduate</p>
                        <p className='text-sm text-zinc-400'>MERN Developer</p>
                    </div>
                </div>
                <div className="">
                    <a target='_blank' href="./resume.pdf" className="bg-green-600 text-white p-2">Resume</a>
                </div>
            </div>
            <div className="flex justify-around items-center">
                <ul className='text-zinc-500 p-10'>
                    <li><a target='_blank' href="https://www.linkedin.com/in/mazharul-alam-728444201/">Linkedin</a></li>
                    <li><a target='_blank' href="https://github.com/sany655">Github</a></li>
                    <li>mazharulalam26@gmail.com</li>
                    <li>+8801876626011</li>
                </ul>
                <ul className='text-zinc-500 p-10'>
                    <li>SSC - 2019 with GPA - 3.5</li>
                    <li>HSC - 2020/21 with GPA - coming soon</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
