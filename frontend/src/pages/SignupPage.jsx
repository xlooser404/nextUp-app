import React from 'react'
import Input from '../components/input.jsx';
import {motion} from 'framer-motion';
import {Lock, Mail, User} from 'lucide-react'; 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';

const SignupPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // Handle signup logic here
    };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Create Account</h2>
            {/* Signup form goes here */}
            <form onSubmit={handleSignUp}>
                <Input 
                icon={User}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <Input 
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <PasswordStrengthMeter password={password} />
                
                <motion.button className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit">
                    Sign Up
                    
                </motion.button>
            </form>
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Already have an account? {""}
                <Link to={"/login"} className='text-green-500 hover:underline'>
                Login</Link>
            </p>

        </div>

    </motion.div>
  )
}

export default SignupPage