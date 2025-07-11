import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../emails/emails.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    // Validate input data
    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }  

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({success:false, message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit verification token

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Token valid for 24 hours  
        });

        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                ...user._doc, // Spread the user document to include all fields
                password: undefined, // Exclude the password field
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: new Date() } // Check if the token is still valid
        });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Fetch the updated user document to ensure the latest state
        const updatedUser = await User.findById(user._id).select('-password'); // Exclude password from the response
        if (!updatedUser) {
            return res.status(500).json({ success: false, message: 'Failed to retrieve updated user' });
        }

        await sendWelcomeEmail(updatedUser.email, updatedUser.name);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error in verifyEmail:', error);
        return res.status(500).json({ success: false, message: "server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }


        generateTokenAndSetCookie(res, user._id);
        
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                ...user._doc, // Spread the user document to include all fields
                password: undefined, // Exclude the password field
            },
        });
    }
    catch (error) {
        console.error('Error in login:', error);
        return res.status(400).json({ success: false, message: 'Server error' });
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // Token valid for 1 hour
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // Construct the reset URL properly
        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendPasswordResetEmail(user.email, resetURL);

        res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        console.log('Received token:', token, 'Current time:', new Date()); // Debug log
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: new Date() }
        });

        if (!user) {
            console.log('Token check failed. Users with token:', await User.find({ resetPasswordToken: token })); // Debug log
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}
