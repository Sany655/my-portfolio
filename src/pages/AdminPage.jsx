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

export default function AdminPage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <AuthGuard>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<EditAbout />} />
            <Route path="/skills" element={<EditSkills />} />
            <Route path="/projects" element={<EditProjects />} />
            <Route path="/contact" element={<EditContact />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AuthGuard>
      } />
    </Routes>
  );
}

function Header() {
  const { logout } = useAuth();
  return (
    <header className="bg-green-500 flex justify-between items-center p-8">
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