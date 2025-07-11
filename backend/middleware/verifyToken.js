import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
        }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Token is not valid' });
        }
        req.userId = decoded.userId; // Assuming the token contains a userId
        next(); 
    } catch (error) {
        console.log('Token verification error:', error);
        return res.status(401).json({ success: false, message: 'Token is not valid' });
    }
}