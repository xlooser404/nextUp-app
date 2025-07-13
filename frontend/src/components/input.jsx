import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * A reusable, themed input component.
 * This component's styles have been updated to match the new green & white theme.
 */
const Input = React.memo(({ icon: Icon, type, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <div className='relative flex items-center mb-4'>
            {/* Icon color changed for better contrast on the light input background */}
            <Icon className='w-5 h-5 absolute left-3 text-gray-400' /> 
            
            <input
                type={isPassword && isPasswordVisible ? 'text' : type}

                className='w-full pl-10 pr-10 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition duration-200'
                {...props}
            />
            
            {isPassword && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    // Icon color updated
                    className="absolute right-3 text-gray-500 hover:text-green-600"
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                    {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
        </div>
    );
});

export default Input;