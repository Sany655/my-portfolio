import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaBriefcase, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export default function WorkExperience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const experienceData = [];
        querySnapshot.forEach((doc) => {
          experienceData.push({ id: doc.id, ...doc.data() });
        });
        setExperience(experienceData);
      } catch (error) {
        console.error("Error fetching work experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) return <div className="text-center py-8">Loading work experience...</div>;

  return (
    <section id="experience" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {experience.map((item) => (
            <div key={item.id} className="border-l-4 border-gray-500 pl-6 py-2">
              <div className="flex flex-col md:flex-row md:items-start">
                {item.logo && (
                  <div className="md:mr-6 mb-4 md:mb-0">
                    <img 
                      src={item.logo} 
                      alt={`${item.company} logo`} 
                      className="w-16 h-16 object-contain rounded"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.position}</h3>
                      <p className="text-gray-600">{item.company}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
                      <FaCalendarAlt className="mr-1" />
                      {format(item.startDate?.toDate(), 'MMM yyyy')} - 
                      {item.currentlyWorking ? ' Present' : format(item.endDate?.toDate(), 'MMM yyyy')}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 my-3">{item.description}</p>
                  
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-medium text-gray-800">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {item.responsibilities.map((responsibility, index) => (
                          <li key={index} className="text-gray-700">{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {item.skills && item.skills.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {item.website && (
                    <a 
                      href={item.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-gray-800 mt-4"
                    >
                      <FaExternalLinkAlt className="mr-1" /> Company Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}