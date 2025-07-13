import { transporter } from "../emails/nodemailer.config.js";
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_REQUEST_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE, 
    WELCOME_EMAIL_TEMPLATE 
} from "./emailTemplates.js";

/** 
 * Sends an email with a verification code to a new user.

@param {string} email - The recipient's email address.
@param {string} verificationToken - The verification code to be sent.

*/ 

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: `"nextUP" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email Address',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error(`Failed to send verification email: ${error.message}`);
    }
};

 export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: `"nextUP" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Welcome Aboard, ${name}!`,
            html: WELCOME_EMAIL_TEMPLATE.replace(/{name}/g, name), // Use regex 'g' flag to replace all occurrences
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error(`Failed to send welcome email: ${error.message}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: `"nextUP" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reset Your Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error(`Failed to send password reset email: ${error.message}`);
    }
};


export const sendResetSuccessEmail = async (email) => {
    try {
        const mailOptions = {
            from: `"nextUP" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset success email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending password reset success email:', error);
        throw new Error(`Failed to send password reset success email: ${error.message}`);
    }
};
