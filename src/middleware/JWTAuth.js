import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '10000s' });
    return accessToken;
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
        console.log('Token invalid');
        console.log(error);
    }
}

const authentication = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token) {
        req.userToken = token;
        next();
    } else {
        res.status(401).json({
            message: 'Unauthenticated',
            code: -1,
            data: ''
        })
    }

}

const authorization = (req, res, next) => {
    const user = verifyToken(req.userToken);
    if (user) {
        if (user.userData && user.userData.Roles) {
            const isPathsPermission = user.userData.Roles.some(
                role => {
                    const reqPathSplit = req.path.split('/');
                    const reqPath = reqPathSplit[0] + '/' + reqPathSplit[1];
                    return role.url === reqPath && role.method.includes(req.method)
                }
            );
            if (isPathsPermission) {                
                next();
            } else {
                res.status(403).json({
                    message: 'Forbidden',
                    code: -1,
                    data: ''
                })
            }
        }
    } else {
        res.status(403).json({
            message: 'Forbidden',
            code: -1,
            data: ''
        })
    }
}

export {
    createToken, verifyToken, authentication, authorization
}