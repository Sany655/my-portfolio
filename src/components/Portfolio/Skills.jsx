// src/components/Portfolio/Skills.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'skills'));
        const skillsData = [];
        querySnapshot.forEach((doc) => {
          skillsData.push({ id: doc.id, ...doc.data() });
        });
        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="glass-effect p-8 rounded-lg shadow-lg text-center bg-white bg-opacity-20 backdrop-blur-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-black text-xl font-semibold mt-4">Loading skills...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="skills"
      className="py-16 px-10 bg-gradient-to-b from-gray-200 to-gray-400 relative container mx-auto"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-black">Skills & Expertise</h2>
      <div
        className={`grid gap-10 ${
          skills.length === 1 ? 'justify-items-center' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {skills.map((category) => (
          <div
            key={category.id}
            className="glass-effect p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center bg-white bg-opacity-20 backdrop-blur-md"
          >
            <h3 className="text-xl font-semibold mb-6 text-black">{category.category}</h3>
            <div className="space-y-6 w-full">
              {category?.skills.length > 0 &&
                category.skills.map((skill, index) => (
                  <div key={index} className="w-full">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-black">{skill.name}</span>
                      <span className="text-sm text-black">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-gray-700 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}