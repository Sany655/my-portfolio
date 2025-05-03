// src/components/Admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Count unread messages
        const messagesQuery = query(
          collection(db, 'messages'),
          where('read', '==', false)
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        setUnreadMessages(messagesSnapshot.size);

        // Count projects
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        
        // Count skill categories
        const skillsSnapshot = await getDocs(collection(db, 'skills'));
        
        setStats({
          projects: projectsSnapshot.size,
          skills: skillsSnapshot.size
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div> */}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Welcome, {currentUser.displayName || 'Admin'}!</h2>
        <p className="text-gray-600">Manage your portfolio content from this dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Messages</h3>
          <p className="text-3xl font-bold">
            {unreadMessages}
            <span className="text-sm font-normal text-gray-500 ml-1">unread</span>
          </p>
          <Link 
            to="/admin/messages" 
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
          >
            View all messages →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Projects</h3>
          <p className="text-3xl font-bold">{stats.projects}</p>
          <Link 
            to="/admin/projects" 
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
          >
            Manage projects →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Skill Categories</h3>
          <p className="text-3xl font-bold">{stats.skills}</p>
          <Link 
            to="/admin/skills" 
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
          >
            Manage skills →
          </Link>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/about"
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit About Section
          </Link>
          <Link
            to="/admin/skills"
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit Skills
          </Link>
          <Link
            to="/admin/projects"
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit Projects
          </Link>
          <Link
            to="/admin/contact"
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit Contact Info
          </Link>
        </div>
      </div>
    </div>
  );
}