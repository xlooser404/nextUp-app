import { Routes, Route, Navigate } from 'react-router-dom';
import FloatingShape from './components/FloatingShape';
import Navbar from './components/Navbar.jsx';

// Import pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import HomePage from './pages/HomePage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'; // Assuming you have this page
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';   // Assuming you have this page

import { useAuthStore } from './store/authStore.js';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  if (!user?.isVerified && window.location.pathname !== '/verify-email') {
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
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {isAuthenticated && user?.isVerified && <Navbar />}

        <main className="flex-grow flex items-center justify-center p-4">
          {/* --- THE FIX IS HERE --- */}
          {/* ALL <Route> components MUST be direct children of the <Routes> component. */}
          <Routes>
            {/* --- Public routes that should NOT be accessible when logged in --- */}
            <Route 
              path="/login" 
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <RedirectAuthenticatedUser>
                  <SignupPage />
                </RedirectAuthenticatedUser>
              } 
            />
             <Route 
              path="/forgot-password" 
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                </RedirectAuthenticatedUser>
              } 
            />
            {/* The token is part of the URL, so it needs a dynamic segment `:token` */}
             <Route 
              path="/reset-password/:token" 
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage />
                </RedirectAuthenticatedUser>
              } 
            />
            
            {/* --- Routes that require authentication but not necessarily verification --- */}
            <Route path="/verify-email" element={ isAuthenticated ? <EmailVerificationPage /> : <Navigate to="/login" /> } />
            
            {/* --- Protected Route that requires full authentication and verification --- */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;