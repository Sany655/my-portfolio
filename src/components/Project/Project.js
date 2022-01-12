import React from 'react'
import { Link } from 'react-router-dom'

function Project({ project }) {
    return (
        <div className="border shadow h-80 relative">
            <img className='border-b-2' src={project.image[0]} alt="" />
            <div className="px-2 absolute bottom-5">
                <h1 className="text-xl">{project.name}</h1>
                <p className="text-md text-zinc-500 mb-3">{project.description}</p>
                <Link className='bg-blue-600 text-white font-bold p-2 rounded' to={`/project-detail/${project.id}`}>Details</Link>
            </div>
        </div>
    )
}

export default Project
