import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';
import { useAuthStore } from '../store/authStore.js';


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
                className='w-full pl-10 pr-4 py-2 bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                {...props}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 text-gray-400 hover:text-green-400"
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

    const handleSignUp = async(e) => {
        e.preventDefault();

        try {
            await signup(name, email, password);
            navigate('/verify-email');
        } catch (error) {
            console.log(error);
        }

        console.log({ name, email, password });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Create Your Account
                </h2>

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <div className="my-4">
                        <PasswordStrengthMeter password={password} />
                    </div>

                    <motion.button
                        className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Create Account"}
                    </motion.button>
                </form>
            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-green-500 hover:underline'>
                        Log In
                    </Link>
                </p>
            </div>

        </motion.div>
    );
};

export default SignupPage;