// src/pages/AdminPage.jsx
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthGuard from '../components/Admin/AuthGuard';
import Dashboard from '../components/Admin/Dashboard';
import EditAbout from '../components/Admin/EditAbout';
import EditSkills from '../components/Admin/EditSkills';
import EditProjects from '../components/Admin/EditProjects';
import EditContact from '../components/Admin/EditContact';
import { useAuth } from '../context/AuthContext';
import Messages from '../components/Admin/Messages';
import Login from '../components/Admin/Login';
import EditEducation from '../components/Admin/EditEducation';
import EditExperience from '../components/Admin/EditExperience';
// import ResumeTemplate from '../components/Resume/ResumeTemplate';
// import ResumeGenerator from '../components/Resume/ResumeGenerator';

export default function AdminPage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/resume" element={<ResumeGenerator />} /> */}
      <Route path="/*" element={
        <AuthGuard>
          <Header />
          <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<EditAbout />} />
            <Route path="/skills" element={<EditSkills />} />
            <Route path="/projects" element={<EditProjects />} />
            <Route path="/contact" element={<EditContact />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/education" element={<EditEducation />} />
            <Route path="/experience" element={<EditExperience />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
          </div>
        </AuthGuard>
      } />
    </Routes>
  );
}

function Header() {
  const { logout } = useAuth();
  return (
    <header className="bg-gray-500 flex justify-between items-center p-8">
      <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
      <nav className="flex space-x-4">
        <Link className="text-white" to="/admin/">Dashboard</Link>
        <Link className="text-white" to="/admin/about">Edit About</Link>
        <Link className="text-white" to="/admin/skills">Edit Skills</Link>
        <Link className="text-white" to="/admin/projects">Edit Projects</Link>
        <Link className="text-white" to="/admin/contact">Edit Contact</Link>
        <Link className="text-white" to="/admin/messages">Messages</Link>
        <button className="text-white border-2 border-grey-100 px-2 py-1" onClick={logout}>Logout</button>
      </nav>
    </header>
  )
}