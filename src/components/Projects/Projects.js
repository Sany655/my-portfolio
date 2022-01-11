import projects from '../../projects.json';

function Projects() {
    
    return (
        <div className='p-10'>
            <h1 className="text-4xl">Some Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
                {projects.map((project,index) => (
                    <div key={index} className="border shadow">
                        <img className='border-b-2' src={project.image} alt="" />
                        <div className="p-2">
                            <h1 className="text-xl">{project.name}</h1>
                            <p className="text-md text-zinc-500">{project.description}</p>
                            <a href={project.link} target='_blank' className='text-blue-500 underline'>Visit live site</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects
