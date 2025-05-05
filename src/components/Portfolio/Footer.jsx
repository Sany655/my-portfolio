import React from 'react'
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { 
  FaGithub, FaLinkedin, FaGlobe 
} from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import ResumeGenerator from '../Resume/ResumeGenerator';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  website: FaGlobe,
  facebook: FaFacebook
};

function Footer() {
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
    <footer className="bg-gray-900 text-gray-300 py-12">
  <div className="container mx-auto px-4">
    {/* Contact Information */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <h3 className="text-lg font-bold mb-2 text-white">Email</h3>
        <a href={`mailto:${contactData.email}`} className="text-gray-400 hover:text-indigo-400 transition-colors">
          {contactData.email}
        </a>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-white">Phone</h3>
        <a href={`tel:${contactData.phone}`} className="text-gray-400 hover:text-indigo-400 transition-colors">
          {contactData.phone}
        </a>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-white">Location</h3>
        <p className="text-gray-400">{contactData.location}</p>
      </div>
    </div>

    {/* Social Links */}
    {contactData.socialLinks && (
      <div className="mt-8 text-center">
        <h3 className="text-lg font-bold mb-4 text-white">Connect With Me</h3>
        <div className="flex justify-center gap-6">
          {contactData.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-indigo-500 transition-colors"
              aria-label={link.platform}
              title={link.platform}
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
        {/* <ResumeGenerator /> */}
      </div>
    )}

    {/* Copyright */}
    <div className="mt-12 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Your Name. All rights reserved.
    </div>
  </div>
</footer>
  )
}

export default Footer