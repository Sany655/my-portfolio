import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FaFileDownload } from 'react-icons/fa';
import ResumeTemplate from './ResumeTemplate';

export default function ResumeGenerator() {
  const [about, setAbout] = useState(null);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutDoc = await getDoc(doc(db, 'about', 'profile'));
        if (aboutDoc.exists()) setAbout(aboutDoc.data());

        const expSnapshot = await getDocs(collection(db, 'experience'));
        setExperience(expSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const eduSnapshot = await getDocs(collection(db, 'education'));
        setEducation(eduSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const skillsSnapshot = await getDocs(collection(db, 'skills'));
        setSkills(skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const contactDoc = await getDoc(doc(db, 'contact', 'info'));
        if (contactDoc.exists()) setContact(contactDoc.data());
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simple HTML-to-PDF using browser print dialog
  const handlePrint = () => {
    const printContents = document.getElementById('resume-content').innerHTML;
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Resume</title>');
    printWindow.document.write('<link rel="stylesheet" href="/index.css" />'); // adjust if needed
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    // printWindow.print();
    printWindow.close();
  };

  if (loading) return <div>Loading resume data...</div>;
  if (!about) return <div>No resume data found</div>;

  return (
    <div className="text-center my-8">
      <button
        onClick={handlePrint}
        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <FaFileDownload className="mr-2" />
        Download Professional Resume (PDF)
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Industry-standard layout | ATS-friendly format
      </p>
      <div id="resume-content" style={{ display: 'none' }}>
        <ResumeTemplate
          about={about}
          experience={experience}
          education={education}
          skills={skills}
          projects={projects}
          contact={contact}
        />
      </div>
      {/* Optionally, show the resume on the page as well */}
      <div className="mt-8">
        <ResumeTemplate
          about={about}
          experience={experience}
          education={education}
          skills={skills}
          projects={projects}
          contact={contact}
        />
      </div>
    </div>
  );
}