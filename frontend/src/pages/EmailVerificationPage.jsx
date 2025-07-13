import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import toast from 'react-hot-toast';
import { Loader, AlertCircle } from 'lucide-react';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading, verifyEmail } = useAuthStore();

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d{6}$/.test(pasteData)) {
            const newCode = pasteData.split('');
            setCode(newCode);
            inputRefs.current[5]?.focus();
        }
    };

    // Using useCallback is a good practice for functions used in useEffect
    const handleSubmit = React.useCallback(async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        if (verificationCode.length !== 6 || isLoading) return;

        const success = await verifyEmail(verificationCode);
        if (success) {
            toast.success('Email verified successfully! Welcome!');
            navigate('/');
        }
    }, [code, isLoading, navigate, verifyEmail]);

    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit({ preventDefault: () => {} });
        }
    }, [code, handleSubmit]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // Main panel styles updated to the new white theme
            className='max-w-md w-full bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-4 text-center text-green-600'>
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-600 mb-8'>Enter the 6-digit code sent to your email address.</p>

                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center space-x-2 md:space-x-3' onPaste={handlePaste}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                // Input styles updated for the new theme
                                className='w-12 h-14 md:w-14 md:h-16 text-center text-3xl font-bold bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200'
                                disabled={isLoading}
                            />
                        ))}
                    </div>

                    {/* Error message style updated for better contrast */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center justify-center text-red-600 bg-red-100 p-3 rounded-lg"
                        >
                            <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                            <span className="text-sm text-center font-medium">{error}</span>
                        </motion.div>
                    )}

                    <div className="mt-8">
                        <motion.button
                            type="submit"
                            // Button styles updated to the new solid green theme
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading || code.join('').length !== 6}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Verify Account"}
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default EmailVerificationPage;