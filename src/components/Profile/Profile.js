import React from 'react'

function Profile() {
    return (
        <div className=''>
            <div className="bg-slate-700 text-white flex flex-col md:flex-row md:justify-between md:items-end p-10 md:px-20">
                <div className="flex items-center md:items-end flex-col md:flex-row">
                    <img src="./images/me.webp" className='rounded-full' alt="" />
                    <div className="m-5">
                        <h1 className='text-2xl'>Mohammad Mazharul Alam</h1>
                        <p className='text-base text-zinc-500'>Undergraduate</p>
                        <p className='text-sm text-zinc-400'>MERN Developer</p>
                    </div>
                </div>
                <div className="mx-5 md:m-0">
                    <a target='_blank' href="./Resume.pdf" className="bg-green-600 text-white p-2">Resume</a>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-around items-right">
                <div className="p-10">
                    <h2 className="text-xl">Links</h2>
                    <ul className='text-zinc-500'>
                        <li><a target='_blank' href="https://www.linkedin.com/in/mazharul-alam-728444201/">Linkedin</a></li>
                        <li><a target='_blank' href="https://github.com/sany655">Github</a></li>
                        <li>mazharulalam26@gmail.com</li>
                        <li>+8801876626011</li>
                    </ul>
                </div>
                <div className="p-10">
                    <h2 className="text-xl">Education</h2>
                    <ul className='text-zinc-500'>
                        <li>SSC - 2019 with GPA - 3.5</li>
                        <li>HSC - 2020/21 with GPA - coming soon</li>
                    </ul>
                </div>
            </div>
            <div className="p-10 border-t-2">Hi, this is Mohammad Mazharul Alam (Sany) from Chattagram Bangladesh. I am an undergraduate student. i love to sleep at night and eat 4 times a day. i am so lazy in reading book, sometimes it helps me to sleep. on the other way i have been learning web development for 3 years. i  have started this journey with <a className='underline' target={'_blank'} href="https://www.xitbangladesh.com/">xit bangladesh</a> as an student, i have learnt php and laravel there, then i have done a course called "Complete Web Development Course With Jhankar Mahbub" in <a href="https://web.programming-hero.com/" target={'_blank'} className='underline'>Programming Hero</a>, it was a node and react course, through this course i have done some projects as assignment. and my blogs are coming soon...</div>
        </div>
    )
}

export default Profile
