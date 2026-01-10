import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'super_scret_key', {
        expiresIn: '1d',
    });
}
export default generateToken;