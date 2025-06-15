// src/components/Admin/AuthGuard.jsx
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const { currentUser, loading, logout } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {    
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}