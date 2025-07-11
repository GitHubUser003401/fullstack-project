import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        if (error.name === 'TokenExpiredError') {
            res.clearCookie('authToken');

            return res.status(401).json({ message: 'Token expired, please login again'
        });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
}