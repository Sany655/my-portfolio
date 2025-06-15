import { useEffect, useState, useRef } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Responsive count
  const slideInterval = useRef(null);

  const autoSlideInterval = 3000;

  // Drag state
  const dragStartX = useRef(null);
  const dragging = useRef(false);

  // Responsive visibleCount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    if (projects.length <= visibleCount) return;
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, autoSlideInterval);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() });
        });
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > visibleCount) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [projects, visibleCount]);

  // Drag handlers
  const handleDragStart = (e) => {
    stopAutoSlide();
    dragging.current = true;
    dragStartX.current = e.type === 'touchstart'
      ? e.touches[0].clientX
      : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!dragging.current) return;
    if (e.type === 'touchmove') e.preventDefault();
  };

  const handleDragEnd = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    const endX = e.type === 'touchend'
      ? (e.changedTouches[0]?.clientX ?? 0)
      : e.clientX;
    const diff = endX - dragStartX.current;
    const threshold = 50;
    if (diff > threshold) {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + projects.length) % projects.length
      );
    } else if (diff < -threshold) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
    startAutoSlide();
  };

  if (loading) return <div className="text-center py-8">Loading projects...</div>;

  // Get the visible projects (window)
  const getVisibleProjects = () => {
    if (projects.length <= visibleCount) return projects;
    const start = currentIndex;
    const end = (start + visibleCount) % projects.length;
    if (end > start) {
      return projects.slice(start, end);
    } else {
      return [...projects.slice(start), ...projects.slice(0, end)];
    }
  };

  const visibleProjects = getVisibleProjects();
  const middleIndex = Math.floor(visibleCount / 2);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        My Projects
      </h2>
      <div
        className="relative sm:px-2"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={startAutoSlide}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseEnter={stopAutoSlide}
        style={{ cursor: 'grab', userSelect: 'none' }}
      >
        <div
          className="flex gap-4 sm:gap-6 justify-center items-center transition-all duration-300 container mx-auto px-4 py-10"
        >
          {visibleProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`bg-gradient-to-tl from-gray-400 to-gray-200 text-black rounded-lg overflow-hidden shadow-md transition-transform duration-500 group flex flex-col h-full
                ${idx === middleIndex
                  ? 'scale-[1.15] z-10 ring-2 ring-gray-500 my-24'
                  : 'scale-90 opacity-70 z-0'
                }
              `}
              style={{
                flex: `0 0 calc(100% / ${visibleCount})`,
                minWidth:
                  visibleCount === 1
                    ? '90vw'
                    : visibleCount === 2
                    ? '45vw'
                    : '28vw',
                maxWidth: '100%',
                transition: 'transform 0.5s, box-shadow 0.5s',
                marginTop: idx === middleIndex ? '-0.5rem' : '0',
              }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 flex-shrink-0"
                draggable={false}
              />
              <div className="p-4 sm:p-6 flex flex-col flex-1 min-h-0">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-3">
                  {project.title}
                </h3>
                <div className="mb-3 sm:mb-4 p-0 bg-transparent rounded-none shadow-none border-0 flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4-8-9-8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                    />
                  </svg>
                  <div
                    className="text-gray-800 text-sm sm:text-base whitespace-pre-line overflow-hidden"
                    style={{
                      maxHeight: 'none',
                      height: 'auto',
                      display: 'block',
                    }}
                  >
                    {project.description}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-300 text-gray-900 text-xs sm:text-sm rounded-full transition-colors duration-300 hover:bg-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2 sm:space-x-3 mt-auto">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 text-xs sm:text-base"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-300 text-xs sm:text-base"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {projects.length > visibleCount && (
          <>
            {/* Left Button */}
            <button
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
                )
              }
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 z-20 sm:left-4"
            >
              &lt;
            </button>

            {/* Right Button */}
            <button
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) => (prevIndex + 1) % projects.length
                )
              }
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 z-20 sm:right-4"
            >
              &gt;
            </button>

            {/* Dots */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 sm:bottom-6">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    idx === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}