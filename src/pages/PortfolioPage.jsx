// src/pages/PortfolioPage.jsx
import Header from '../components/Portfolio/Header.jsx';
import About from '../components/Portfolio/About.jsx';
import Skills from '../components/Portfolio/Skills.jsx';
import Projects from '../components/Portfolio/Projects.jsx';
import Contact from '../components/Portfolio/Contact.jsx';
import Footer from '../components/Portfolio/Footer.jsx';
import Education from '../components/Portfolio/Education.jsx';
import WorkExperience from '../components/Portfolio/WorkExperience.jsx';

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-8">
        <About />
        <Skills />
        <Education />
        <WorkExperience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default PortfolioPage;