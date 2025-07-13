import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';
import { useAuthStore } from '../store/authStore.js';

// --- Reusable Input Component with new styling ---
const Input = React.memo(({ icon: Icon, type, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <div className='relative flex items-center mb-4'>
            {/* Icon color updated */}
            <Icon className='w-5 h-5 absolute left-3 text-gray-400' />
            <input
                type={isPassword && isPasswordVisible ? 'text' : type}
                // Input field styles updated for the new theme
                className='w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500'
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


const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const success = await signup(name, email, password);
        if (success) {
            navigate('/verify-email');
        }
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
                    Create Your Account
                </h2>
                <p className="text-center text-gray-500 mb-8">Join nextUP to manage your tasks efficiently.</p>

                <form onSubmit={handleSignUp}>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Error message style updated */}
                    {error && <p className="text-red-600 text-sm text-center -mt-2 mb-4">{error}</p>}

                    {/* Password strength meter is still useful */}
                    <div className="my-4">
                        <PasswordStrengthMeter password={password} />
                    </div>

                    <motion.button
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Create Account"}
                    </motion.button>
                </form>
            </div>

            {/* Bottom link section updated for the new theme */}
            <div className='px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center'>
                <p className='text-sm text-gray-600'>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-green-600 hover:underline font-bold'>
                        Log In
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default SignupPage;