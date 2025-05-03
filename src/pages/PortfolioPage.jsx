// src/pages/PortfolioPage.jsx
import Header from '../components/Portfolio/Header.jsx';
import About from '../components/Portfolio/About.jsx';
import Skills from '../components/Portfolio/Skills.jsx';
import Projects from '../components/Portfolio/Projects.jsx';
import Contact from '../components/Portfolio/Contact.jsx';
import Footer from '../components/Portfolio/Footer.jsx';
import ContactInfo from '../components/Portfolio/ContactInfo.jsx';

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <About />
        <Skills />
        <Projects />
        <ContactInfo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default PortfolioPage;