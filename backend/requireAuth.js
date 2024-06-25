import jwt from 'jsonwebtoken';
import User from './schemas/users.js';

const requireAuth = async function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Not Authorized' })
    }
    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.SECRET);

        res.user = await User.findById(payload.id);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Not Authorized' });
    }
};

export default requireAuth;