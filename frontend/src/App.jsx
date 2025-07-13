import { Routes, Route, Navigate } from 'react-router-dom';
import FloatingShape from './components/FloatingShape';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; 

// Import pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import HomePage from './pages/HomePage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

import { useAuthStore } from './store/authStore.js';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};


function App() {
  const { checkAuth, isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-lime-900 relative overflow-hidden'>
      <FloatingShape color='bg-lime-400' size='w-64 h-64' top='-10%' left='-5%' delay={0} />
      <FloatingShape color='bg-cyan-400' size='w-72 h-72' top='60%' left='75%' delay={2} />
      <FloatingShape color='bg-teal-500' size='w-32 h-32' top='30%' left='40%' delay={5} />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {isAuthenticated && user?.isVerified && <Navbar />}

        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            {/* --- Public routes that redirect if you're already logged in --- */}
            <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
            <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
            <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
            <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
            

            <Route 
              path="/verify-email" 
              element={isAuthenticated ? <EmailVerificationPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<ProtectedRoute><HomePage /></ProtectedRoute>} 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;