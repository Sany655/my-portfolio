// src/components/Portfolio/ContactInfo.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaGithub, FaLinkedin, FaGlobe 
} from 'react-icons/fa';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  website: FaGlobe
};

export default function ContactInfo() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const docRef = doc(db, 'contact', 'info');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactData(docSnap.data());
      }
    };
    fetchContactInfo();
  }, []);

  if (!contactData) return <div>Loading contact information...</div>;

  const getSocialIcon = (platform) => {
    const lowerPlatform = platform.toLowerCase();
    for (const [key, Icon] of Object.entries(socialIcons)) {
      if (lowerPlatform.includes(key)) {
        return <Icon className="w-5 h-5" />;
      }
    }
    return <FaGlobe className="w-5 h-5" />;
  };

  return (
    <section id="contact-info" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FaEnvelope className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <a href={`mailto:${contactData.email}`} className="text-gray-600 hover:text-indigo-600">
                {contactData.email}
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FaPhone className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <a href={`tel:${contactData.phone}`} className="text-gray-600 hover:text-indigo-600">
                {contactData.phone}
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FaMapMarkerAlt className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-gray-600">{contactData.location}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FaClock className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Availability</h3>
              <p className="text-gray-600">{contactData.availability}</p>
            </div>
          </div>
        </div>

        {contactData.socialLinks && contactData.socialLinks.length > 0 && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
            <div className="flex justify-center gap-4">
              {contactData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                  aria-label={link.platform}
                  title={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}