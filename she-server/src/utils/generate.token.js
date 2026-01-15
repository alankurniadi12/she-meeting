import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}
export default generateToken;