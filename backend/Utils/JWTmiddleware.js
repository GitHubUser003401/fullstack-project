import jwt from 'jsonwebtoken';

export const tokenMiddleware = (req, res, next) => {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please login again', 
                error: error.name
        });
        }
        console.log(error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}
export default tokenMiddleware;