// src/components/Portfolio/About.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, 
  FaFacebook, FaYoutube, FaGlobe, FaEnvelope 
} from 'react-icons/fa';

// Map social media names to their corresponding icons
const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  website: FaGlobe,
  email: FaEnvelope
};

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const docRef = doc(db, 'about', 'profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAboutData(docSnap.data());
      }
    };
    fetchAbout();
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  // Function to get the appropriate icon component
  const getSocialIcon = (name) => {
    const lowerName = name.toLowerCase();
    for (const [key, Icon] of Object.entries(socialIcons)) {
      if (lowerName.includes(key)) {
        return <Icon className="w-5 h-5" />;
      }
    }
    return <FaGlobe className="w-5 h-5" />; // Default icon
  };

  return (
    <section id="about" className="py-12">
      {/* <h2 className="text-3xl font-bold mb-6">About Me</h2> */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3 flex justify-center">
          <img 
            src={aboutData.imageUrl} 
            alt={aboutData.name} 
            className="rounded-full w-64 h-64 object-cover shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{aboutData.name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{aboutData.title}</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{aboutData.bio}</p>
          <div className="flex gap-4">
            {aboutData.socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                // className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                className="text-blue-500 hover:text-blue-700 transition-colors"
                aria-label={link.name}
                title={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}