import jwt from 'jsonwebtoken';
import Users from './schemas/users.js';

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Not Authorized' });
    }

    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.SECRET);
        req.user = await Users.findById(payload.id); // Corrected assignment to req.user
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Not Authorized' });
    }
};

export default requireAuth;
