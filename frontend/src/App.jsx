import { Routes, Route, Navigate } from 'react-router-dom';
import FloatingShape from './components/FloatingShape';

// Import pages and the new Navbar
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx'; // 1. IMPORT THE NAVBAR

import { useAuthStore } from './store/authStore.js';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

// --- (Your ProtectedRoute and RedirectAuthenticatedUser components remain the same) ---

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user?.isVerified) {
    return <Navigate to="/login" replace />;
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
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    if(checkAuth) {
      checkAuth();
    }
  }, [checkAuth]);

  return (
    // The main container for the background gradient and shapes
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden'>
      {/* Background Shapes are positioned absolutely relative to this container */}
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      {/* 2. A new container for stacking the Navbar and the page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* The Navbar is rendered here, only if the user is authenticated */}
        {isAuthenticated && user?.isVerified && <Navbar />}

        {/* The main content area grows to fill the remaining space */}
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            {/* Public Routes */}
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
            
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            
            {/* Protected Route */}
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