// PasswordStrengthMeter.jsx

import React from 'react';
import { Check, X } from 'lucide-react'; // Corrected: Import 'X' icon

/**
 * Displays a checklist of password requirements and their validation status.
 */
const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: 'At least 8 characters', valid: password.length >= 8 },
        { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
        { label: 'Contains lowercase letter', valid: /[a-z]/.test(password) },
        { label: 'Contains number', valid: /\d/.test(password) },
        { label: 'Contains special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];

    return (
        <div className='mt-4 space-y-2'>
            {criteria.map((item) => (
                <div key={item.label} className='flex items-center text-sm transition-colors duration-300'>
                    {/* Corrected: Used item.valid instead of item.met */}
                    {item.valid ? (
                        <Check className='size-4 text-green-500 mr-2 shrink-0' />
                    ) : (
                        <X className='size-4 text-gray-500 mr-2 shrink-0' />
                    )}
                    {/* Corrected: Used item.valid instead of item.met */}
                    <span className={item.valid ? 'text-green-500' : 'text-gray-500'}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PasswordStrengthMeter = ({ password }) => {
    // Calculates a numerical strength score from 0 to 4
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (pass.match(/[A-Z]/)) strength++;
        if (pass.match(/[a-z]/)) strength++;
        if (pass.match(/\d/) && pass.match(/[!@#$%^&*(),.?":{}|<>]/)) strength++;
    

        return Math.min(strength, 4); // Ensures strength doesn't exceed 4
    };

    const strength = getStrength(password);


    const getColor = (strengthScore) => {
        if (strengthScore <= 1) return 'bg-red-500';
        if (strengthScore === 2) return 'bg-yellow-500';
        if (strengthScore === 3) return 'bg-blue-500';
        return 'bg-green-500';
    };


    const getStrengthText = (strengthScore) => {
        if (strengthScore === 0 && password.length > 0) return 'Weak';
        if (strengthScore === 1) return 'Weak';
        if (strengthScore === 2) return 'Fair';
        if (strengthScore === 3) return 'Good';
        if (strengthScore === 4) return 'Strong';
        return ''; // Return empty string if no password
    };

    return (
        <div className='mt-2 w-full'>
            <div className='flex items-center mb-1 space-x-2'>
                <div className='flex-grow h-1.5 bg-gray-600 rounded-full overflow-hidden'>
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${getColor(strength)}`}
                        style={{ width: `${(strength / 4) * 100}%` }}
                    />
                </div>
                <span className='text-xs text-gray-400 w-12 text-right'>
                    {getStrengthText(strength)}
                </span>
            </div>
            
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;