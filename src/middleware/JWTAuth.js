import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '10s' });
    console.log(accessToken);
    return accessToken;
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        console.log(data);
    } catch (error) {
        console.log('Token invalid');
        // console.log(error);
    }
}

export {
    createToken, verifyToken
}