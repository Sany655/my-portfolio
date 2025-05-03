// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import '@fortawesome/fontawesome-free';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;