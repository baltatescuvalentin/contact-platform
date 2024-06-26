import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization") || req.header("authorization");

        if(!token) {
            return res.status(403).send("Access denied");
        }

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        const { exp } = verified;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (exp < currentTimestamp) {
            return res.status(403).send("Access denied - Token expired");
        }

        req.user = verified;
        next();
    }
    catch(error) {
        res.status(500).json({
            error: 'Bad JSONWebToken'
        })
    }
}