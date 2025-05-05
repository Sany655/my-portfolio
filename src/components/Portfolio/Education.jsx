import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaGraduationCap, FaCertificate, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const q = query(collection(db, 'education'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const educationData = [];
        querySnapshot.forEach((doc) => {
          educationData.push({ id: doc.id, ...doc.data() });
        });
        setEducation(educationData);
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  if (loading) return <div className="text-center py-8">Loading education...</div>;

  return (
    <section id="education" className="my-5 py-16 border border-gray-200 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Education & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item) => (
            <div
              key={item.id}
              className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Icon */}
              <div className="absolute -top-6 left-6 bg-gray-600 text-white p-4 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon === 'certificate' ? (
                  <FaCertificate className="text-2xl" />
                ) : (
                  <FaGraduationCap className="text-2xl" />
                )}
              </div>

              {/* Content */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                  {item.degree} in {item.field}
                </h3>
                <p className="text-gray-600 mb-2">{item.institution}</p>

                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  {format(item.startDate?.toDate(), 'MMM yyyy')} -{' '}
                  {item.currentlyEnrolled ? 'Present' : format(item.endDate?.toDate(), 'MMM yyyy')}
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{item.description}</p>

                {/* Link */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Verify credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}