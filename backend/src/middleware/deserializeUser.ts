import { NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.util';

const deserializeUser = async (req: any, res: any, next: NextFunction) => {
    const accessToken = req?.headers?.authorization;
    
    if (accessToken?.startsWith('Bearer')) {
        const token = accessToken.split(' ')[1];

        const { decoded } = verifyJwt(token);

        if (decoded) {
            req.user = decoded;
            return next();
        }
    }
    return res.status(401).json({
        status: false,
        message: 'Authorization denied!',
        data: {}
    });
};

export default deserializeUser;
