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

  if (loading) return <div className="text-center py-8">Loading skills...</div>;

  return (
    <section id="skills" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="space-y-3">
              {category?.skills.length > 0 && category.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
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