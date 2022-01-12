import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projects from '../../projects.json'

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [load, setLoad] = useState(true)
    useEffect(() => {
        setProject(projects.filter(p => p.id === parseInt(id))[0])
        setLoad(false)
    }, [id])
    if (load) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>
    }
    return (
        <div>
            <div className="md:grid grid-cols-3">
                {project.image.map((img, i) => {
                    return <a key={i} href={`../../${img}`} target={'_blank'}><img className='border-2 shadow' style={{ height: 350 }} src={`../../${img}`} alt="" /></a>
                })}
            </div>
            <div className="p-5 md:p-10">
                <h1 className="text-4xl">{project.name}</h1>
                <ul className='my-5'>
                    {
                        project.details.map((d,i) => <li key={i}>* {d}</li>)
                    }
                </ul>
                <a target={'_blank'} href={project.git} className='bg-blue-600 text-white p-2 m-2'>Git Repository</a>
                <a target={'_blank'} href={project.link} className='bg-blue-600 text-white p-2 m-2'>Live link</a>
            </div>
        </div>
    )
}

export default ProjectDetail
