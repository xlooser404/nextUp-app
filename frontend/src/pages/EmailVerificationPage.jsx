import { useEffect, useState, useRef } from 'react';
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

    // Focus the first input on component mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {
        if (isNaN(value)) return; // Only allow numbers

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus the next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move focus to the previous input on backspace
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
            // Focus the last input after pasting
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        if (verificationCode.length !== 6 || isLoading) return;

        const success = await verifyEmail(verificationCode);
        if (success) {
            toast.success('Email verified successfully! Welcome!');
            navigate('/'); // Redirect to home/dashboard
        }
    };

    // Auto-submit when all fields are filled
    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            // Directly call the submission logic
            handleSubmit({ preventDefault: () => {} }); // Pass a mock event object
        }
    }, [code]); // Dependency array should ideally include handleSubmit as well

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-8'>Enter the 6-digit code sent to your email.</p>

                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center space-x-2 md:space-x-3' onPaste={handlePaste}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1} // CRITICAL FIX: Each input must only accept 1 digit
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-12 h-14 md:w-14 md:h-16 text-center text-3xl font-bold bg-gray-700 bg-opacity-50 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200'
                                disabled={isLoading}
                            />
                        ))}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center justify-center text-red-400 bg-red-900 bg-opacity-30 p-3 rounded-lg"
                        >
                            <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                            <span className="text-sm text-center">{error}</span>
                        </motion.div>
                    )}

                    <div className="mt-8">
                        <motion.button
                            type="submit"
                            className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center'
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