import projects from '../../projects.json';
import Project from '../Project/Project';

function Projects() {
    
    return (
        <div className='p-10'>
            <h1 className="text-4xl">Some Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
                {projects.map((project,index) => (
                    <Project project={project} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Projects
