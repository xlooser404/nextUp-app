import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userInitial = user?.name ? user.name[0].toUpperCase() : <UserIcon size={18} />;

  return (
    <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-4 z-30">
        <header 
          className="w-full bg-white/80 backdrop-blur-lg rounded-xl shadow-lg"
        >
          <nav className="px-6 py-3 flex justify-between items-center">
            {/* Logo / Brand Name */}
            <Link to="/" className="text-2xl font-bold text-gray-800">
              next<span className="text-green-600">UP</span>
            </Link>

            {/* User Profile and Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-bold text-white text-sm">
                  {userInitial}
                </div>
                <span className="text-gray-800 font-semibold hidden sm:block">
                  {user?.name}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-gray-600" />
                </motion.div>
              </motion.button>

              {/* Animated Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </header>
    </div>
  );
};

export default Navbar;