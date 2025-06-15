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

  if (!aboutData) {
    return (
      <div className="text-center text-gray-500 animate-pulse my-24">
        <div className="w-40 h-40 rounded-full bg-gray-200 shadow-lg mx-auto mb-6"></div>
        <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto mb-2"></div>
        <div className="h-4 w-56 bg-gray-200 rounded mx-auto mb-2"></div>
        <div className="h-4 w-40 bg-gray-200 rounded mx-auto"></div>
      </div>
    )
  }

  // Function to get the appropriate icon component
  const getSocialIcon = (name) => {
    const lowerName = name.toLowerCase();
    for (const [key, Icon] of Object.entries(socialIcons)) {
      if (lowerName.includes(key)) {
        return <Icon className="w-6 h-6" />;
      }
    }
    return <FaGlobe className="w-6 h-6" />; // Default icon
  };

  return (
    <section id="about" className="pb-24 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col gap-12 items-center text-center">
          {aboutData.imageUrl && (
            <div 
              className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-primary animate-fade-in"
              style={{ animationDuration: '1s' }}
            >
              <img 
                src={aboutData.imageUrl} 
                alt={aboutData.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="animate-slide-up" style={{ animationDuration: '1s' }}>
            <h1 className="text-4xl font-extrabold text-primary mb-4">{aboutData.name}</h1>
            <h2 className="text-2xl font-semibold text-secondary mb-6">{aboutData.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">{aboutData.bio}</p>
            <div className="flex justify-center gap-6">
              {aboutData.socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors transform hover:scale-110"
                  aria-label={link.name}
                  title={link.name}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}