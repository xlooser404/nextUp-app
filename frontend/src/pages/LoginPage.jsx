import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

// --- Reusable Input Component with new styling ---
// Note: It's best practice to move this to its own file (e.g., components/Input.jsx)
// and import it here. For simplicity, we are updating it directly.
const Input = React.memo(({ icon: Icon, type, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <div className='relative flex items-center mb-4'>
      <Icon className='w-5 h-5 absolute left-3 text-gray-400' />
      <input
        type={isPassword && isPasswordVisible ? 'text' : type}
        // Input field styles updated for the new theme
        className='w-full pl-10 pr-10 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition duration-200'
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 text-gray-500 hover:text-green-600"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
});


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await login(email, password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Main panel styles updated to a white/light-gray gradient with a shadow
      className='max-w-md w-full bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center text-green-600'>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error message style updated */}
          {error && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="text-red-600 text-sm text-center mb-4 -mt-2"
            >
              {error}
            </motion.p>
          )}

          {/* Forgot Password link style updated */}
          <div className='flex items-center justify-end mb-6'>
            <Link to='/forgot-password' className='text-sm text-green-600 hover:underline font-bold'>
              Forgot Password?
            </Link>
          </div>

          <motion.button
            // Button styles updated to the new solid green theme
            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Login"}
          </motion.button>
        </form>
      </div>

      {/* Bottom link section updated for the new theme */}
      <div className='px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center'>
        <p className='text-sm text-gray-600'>
          Don't have an account?{" "}
          <Link to={"/signup"} className='text-green-600 hover:underline font-bold'>
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;