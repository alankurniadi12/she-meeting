import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

async function protect(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('Authorization header found', req.headers.authorization);
        token = req.headers.authorization.split(' ')[1];    
        console.log('Extracted token:', token);
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        console.log('Try Verifying token:', token);
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified, decoded payload:', decoded);
        const user = await User.findById(decoded.id).select('-password');
        console.log('User fetched from DB:', user);
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found or inactive' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}
export default protect;