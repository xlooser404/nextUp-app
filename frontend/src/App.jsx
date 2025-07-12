import { Routes, Route } from 'react-router-dom';
import FloatingShape from './components/FloatingShape';

// Import your page components here
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      {/* Background Shapes */}
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      {/* Corrected: Typo in 'emerald' */}
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      {/* Main content will be rendered here based on the route */}
      <main className="z-10">
        <Routes>
          {/* Example Routes */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* A placeholder for the home page content */}
          <Route path="/" element={<h1 className="text-white text-4xl">Home Page Content</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;