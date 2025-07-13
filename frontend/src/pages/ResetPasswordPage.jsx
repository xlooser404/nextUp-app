import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Loader } from 'lucide-react';
// Re-use the styled Input component
import Input from '../components/Input.jsx'; 
// Import the PasswordStrengthMeter for a consistent UX
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const { resetPassword, isLoading, error } = useAuthStore();
    
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!password || !confirmPassword) {
            toast.error("Please fill in both password fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const success = await resetPassword(token, password);

        if (success) {
            toast.success("Password has been reset successfully! You can now log in.");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // Main panel styles updated to the new white theme
            className='max-w-md w-full bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center text-green-600'>
                    Choose a New Password
                </h2>

                {/* Error message style updated for better contrast */}
                {error && (
                    <p className="text-red-600 text-sm text-center -mt-2 mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="New Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm New Password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {/* Added PasswordStrengthMeter for good practice and consistency */}
                    <div className="my-4">
                        <PasswordStrengthMeter password={password} />
                    </div>

                    <motion.button
                        // Button styles updated to the new solid green theme
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : "Reset Password"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetPasswordPage;