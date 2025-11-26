import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import UserInfo from './pages/userinfo';
import CTA from './components/CTA';
import MedCheck from './components/medinfo';
import Analize from './components/analize';
import HealthPlan from './components/healthplan';
import Footer from './components/footer'

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div style={{textAlign: 'center', padding: '50px'}}>Cargando...</div>;
  }

  // Show login/signup page if not authenticated
  if (!isAuthenticated) {
    return <UserInfo onAuthSuccess={handleAuthSuccess} />;
  }

  // Show main app if authenticated
  return(
    <div className='Background'>
      <Header onLogout={handleLogout} />
      <CTA/>
      <MedCheck/>
      <Analize/>
      <HealthPlan/>
      <Footer/>
    </div>
  )
}

export default App