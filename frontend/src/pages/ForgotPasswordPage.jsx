import { motion } from "framer-motion";
import { Mail, Loader, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authStore.js';
import Input from '../components/Input.jsx';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isLoading, forgetPassword } = useAuthStore();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email) return;
      await forgetPassword(email);
      setIsSubmitted(true);
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
                    Reset Password
                </h2>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <p className="text-gray-300 mb-6 text-center">Enter your email address and we'll send you a link to reset your password.</p>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <motion.button
                            className='w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Send Reset Link"}
                        </motion.button>
                    </form>
                ) : (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <Mail className="w-8 h-8 text-white" />
                        </motion.div>
                        <p className="text-gray-300 mb-6">If an account exists for <span className="font-bold text-green-400">{email}</span>, you will receive a password reset link shortly.</p>
                    </div>
                )}
            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400 flex items-center gap-2'>
                    <ArrowLeft size={16} />
                    Remembered your password?{" "}
                    <Link to={"/login"} className='text-green-500 hover:underline font-semibold'>
                        Log In
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default ForgotPasswordPage;