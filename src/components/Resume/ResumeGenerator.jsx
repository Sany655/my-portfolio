import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FaFileDownload } from 'react-icons/fa';
import ResumeTemplate from './ResumeTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  if (loading) return <div>Loading resume data...</div>;
  if (!about) return <div>No resume data found</div>;

  const resumeData = { about, experience, education, skills, projects, contact };

  const downloadPDF = () => {
    const input = document.getElementById('resume'); // your component container
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div className="text-center my-8">
      <button onClick={downloadPDF}>
        Download Resume
      </button>

      {/* <p className="text-sm text-gray-500 mt-2">
        Industry-standard layout | ATS-friendly format
      </p> */}

      {/* Visible Resume Preview */}
      <div id="resume" className="">
        <ResumeTemplate {...resumeData} />
      </div>
    </div>
  );
}